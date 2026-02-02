"""
Property-based tests for CompanyStatistic ordering functionality
**Feature: dynamic-content-integration, Property 4: Statistics Ordering Consistency**
**Validates: Requirements 1.4**
"""
from django.test import TestCase, RequestFactory
from hypothesis import given, strategies as st, settings, HealthCheck
from hypothesis.extra.django import TestCase as HypothesisTestCase

from .views import IndexView
from .models import CompanyStatistic


class StatisticsOrderingPropertyTest(HypothesisTestCase):
    """Property-based tests for CompanyStatistic ordering on homepage"""
    
    def setUp(self):
        self.factory = RequestFactory()
        self.view = IndexView()
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=100, alphabet=st.characters(blacklist_categories=('Cc', 'Cs'))).filter(lambda x: x.strip()),
                'value': st.text(min_size=1, max_size=50, alphabet=st.characters(blacklist_categories=('Cc', 'Cs'))).filter(lambda x: x.strip()),
                'suffix': st.text(min_size=0, max_size=10),
                'icon_class': st.text(min_size=0, max_size=100),
                'order': st.integers(min_value=0, max_value=100)
            }),
            min_size=2,
            max_size=10
        )
    )
    @settings(max_examples=100, suppress_health_check=[HealthCheck.filter_too_much])
    def test_statistics_ordering_consistency_property(self, statistics_data_list):
        """
        **Feature: dynamic-content-integration, Property 4: Statistics Ordering Consistency**
        **Validates: Requirements 1.4**
        
        For any CompanyStatistic entries, they should be displayed on the homepage 
        in the order specified by their order field
        """
        # Clean up any existing data
        CompanyStatistic.objects.all().delete()
        
        # Create test statistic entries
        created_statistics = []
        for stat_data in statistics_data_list:
            statistic = CompanyStatistic.objects.create(**stat_data)
            created_statistics.append(statistic)
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        # Property 1: Context should contain company_statistics key
        self.assertIn('company_statistics', context)
        
        # Property 2: Statistics should be ordered by the 'order' field
        returned_statistics = list(context['company_statistics'])
        
        # Check that statistics are in ascending order by 'order' field
        for i in range(len(returned_statistics) - 1):
            current_order = returned_statistics[i].order
            next_order = returned_statistics[i + 1].order
            self.assertLessEqual(current_order, next_order, 
                               f"Statistics not properly ordered: {current_order} should be <= {next_order}")
        
        # Property 3: All created statistics should be in the context
        returned_ids = {stat.id for stat in returned_statistics}
        expected_ids = {stat.id for stat in created_statistics}
        self.assertEqual(returned_ids, expected_ids)
        
        # Property 4: Number of returned statistics should match database count
        total_statistics = CompanyStatistic.objects.count()
        self.assertEqual(len(returned_statistics), total_statistics)
        
        # Property 5: Each statistic should have all required fields
        for statistic in returned_statistics:
            self.assertTrue(hasattr(statistic, 'title'))
            self.assertTrue(hasattr(statistic, 'value'))
            self.assertTrue(hasattr(statistic, 'suffix'))
            self.assertTrue(hasattr(statistic, 'icon_class'))
            self.assertTrue(hasattr(statistic, 'order'))
            self.assertIsNotNone(statistic.title)
            self.assertIsNotNone(statistic.value)
            # suffix and icon_class can be empty strings
            self.assertTrue(hasattr(statistic, 'suffix'))
            self.assertTrue(hasattr(statistic, 'icon_class'))
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=100).filter(lambda x: x.strip()),
                'value': st.text(min_size=1, max_size=50).filter(lambda x: x.strip()),
                'suffix': st.one_of(st.just('+'), st.just('%'), st.just('K'), st.just('')),
                'icon_class': st.one_of(
                    st.just('icon-scaffolding'),
                    st.just('icon-engineer'),
                    st.just('icon-workstations'),
                    st.just('')
                ),
                'order': st.integers(min_value=1, max_value=20)
            }),
            min_size=3,
            max_size=8
        )
    )
    @settings(max_examples=100)
    def test_statistics_with_realistic_data_property(self, statistics_data_list):
        """
        Test statistics ordering with realistic data values
        """
        # Clean up any existing data
        CompanyStatistic.objects.all().delete()
        
        # Create test statistic entries
        for stat_data in statistics_data_list:
            CompanyStatistic.objects.create(**stat_data)
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        returned_statistics = list(context['company_statistics'])
        
        # Property: Statistics should maintain consistent ordering
        if len(returned_statistics) > 1:
            # Verify ordering is consistent
            orders = [stat.order for stat in returned_statistics]
            sorted_orders = sorted(orders)
            self.assertEqual(orders, sorted_orders)
        
        # Property: Each statistic should have meaningful content
        for statistic in returned_statistics:
            self.assertIsInstance(statistic.title, str)
            self.assertGreater(len(statistic.title.strip()), 0)
            self.assertIsInstance(statistic.value, str)
            self.assertGreater(len(statistic.value.strip()), 0)
            self.assertIsInstance(statistic.order, int)
            self.assertGreaterEqual(statistic.order, 0)
    
    def test_empty_statistics_handling(self):
        """
        Test graceful handling when no statistics exist
        """
        # Clean up any existing data
        CompanyStatistic.objects.all().delete()
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        # Should still have company_statistics key with empty queryset
        self.assertIn('company_statistics', context)
        returned_statistics = list(context['company_statistics'])
        self.assertEqual(len(returned_statistics), 0)
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=100),
                'value': st.text(min_size=1, max_size=50),
                'suffix': st.text(min_size=0, max_size=10),
                'icon_class': st.text(min_size=0, max_size=100),
                'order': st.just(5)  # All have same order
            }),
            min_size=3,
            max_size=6
        )
    )
    @settings(max_examples=100)
    def test_statistics_same_order_property(self, statistics_data_list):
        """
        Test that statistics with the same order value are handled consistently
        """
        # Clean up any existing data
        CompanyStatistic.objects.all().delete()
        
        # Create test statistic entries with same order
        for stat_data in statistics_data_list:
            CompanyStatistic.objects.create(**stat_data)
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        returned_statistics = list(context['company_statistics'])
        
        # Property: All statistics should have the same order value
        for statistic in returned_statistics:
            self.assertEqual(statistic.order, 5)
        
        # Property: All created statistics should be returned
        self.assertEqual(len(returned_statistics), len(statistics_data_list))
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=100),
                'value': st.text(min_size=1, max_size=50),
                'suffix': st.text(min_size=0, max_size=10),
                'icon_class': st.text(min_size=0, max_size=100),
                'order': st.integers(min_value=-10, max_value=10)  # Include negative orders
            }),
            min_size=2,
            max_size=8
        )
    )
    @settings(max_examples=100)
    def test_statistics_negative_order_property(self, statistics_data_list):
        """
        Test that statistics with negative order values are handled correctly
        """
        # Clean up any existing data
        CompanyStatistic.objects.all().delete()
        
        # Create test statistic entries
        for stat_data in statistics_data_list:
            CompanyStatistic.objects.create(**stat_data)
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        returned_statistics = list(context['company_statistics'])
        
        # Property: Statistics should be ordered correctly even with negative values
        for i in range(len(returned_statistics) - 1):
            current_order = returned_statistics[i].order
            next_order = returned_statistics[i + 1].order
            self.assertLessEqual(current_order, next_order)
        
        # Property: Negative orders should come before positive orders
        orders = [stat.order for stat in returned_statistics]
        negative_orders = [o for o in orders if o < 0]
        positive_orders = [o for o in orders if o >= 0]
        
        if negative_orders and positive_orders:
            max_negative = max(negative_orders)
            min_positive = min(positive_orders)
            self.assertLess(max_negative, min_positive)
    
    def test_statistics_model_meta_ordering(self):
        """
        Test that the CompanyStatistic model's Meta ordering is working
        """
        # Clean up any existing data
        CompanyStatistic.objects.all().delete()
        
        # Create statistics with specific orders
        stat1 = CompanyStatistic.objects.create(
            title="Third Stat", value="30", order=3
        )
        stat2 = CompanyStatistic.objects.create(
            title="First Stat", value="10", order=1
        )
        stat3 = CompanyStatistic.objects.create(
            title="Second Stat", value="20", order=2
        )
        
        # Query directly from model (should use Meta ordering)
        all_stats = list(CompanyStatistic.objects.all())
        
        # Should be ordered by 'order' field
        self.assertEqual(all_stats[0].order, 1)
        self.assertEqual(all_stats[1].order, 2)
        self.assertEqual(all_stats[2].order, 3)
        
        # Verify the titles match expected order
        self.assertEqual(all_stats[0].title, "First Stat")
        self.assertEqual(all_stats[1].title, "Second Stat")
        self.assertEqual(all_stats[2].title, "Third Stat")