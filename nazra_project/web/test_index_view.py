"""
Property-based tests for IndexView homepage slider functionality
**Feature: dynamic-content-integration, Property 1: Homepage Dynamic Content Display**
**Validates: Requirements 1.1**
"""
from django.test import TestCase, RequestFactory
from django.template import Context, Template
from hypothesis import given, strategies as st, settings
from hypothesis.extra.django import TestCase as HypothesisTestCase

from .views import IndexView
from .models import HomeSlider


class IndexViewPropertyTest(HypothesisTestCase):
    """Property-based tests for IndexView homepage slider display"""
    
    def setUp(self):
        self.factory = RequestFactory()
        self.view = IndexView()
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=200),
                'tagline': st.text(min_size=1, max_size=200),
                'is_active': st.just(True)  # Only active sliders
            }),
            min_size=1,
            max_size=10
        )
    )
    @settings(max_examples=100)
    def test_homepage_dynamic_content_display_property(self, slider_data_list):
        """
        **Feature: dynamic-content-integration, Property 1: Homepage Dynamic Content Display**
        **Validates: Requirements 1.1**
        
        For any homepage request, when active HomeSlider entries exist in the database,
        the system should display only those active entries instead of static content
        """
        # Clean up any existing data
        HomeSlider.objects.all().delete()
        
        # Create test slider entries
        created_sliders = []
        for slider_data in slider_data_list:
            slider = HomeSlider.objects.create(**slider_data)
            created_sliders.append(slider)
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        # Property 1: Context should contain home_sliders key
        self.assertIn('home_sliders', context)
        
        # Property 2: All returned sliders should be active
        returned_sliders = list(context['home_sliders'])
        for slider in returned_sliders:
            self.assertTrue(slider.is_active)
        
        # Property 3: Number of returned sliders should match active sliders in database
        active_count = HomeSlider.objects.filter(is_active=True).count()
        self.assertEqual(len(returned_sliders), active_count)
        
        # Property 4: All created active sliders should be in the context
        returned_ids = {slider.id for slider in returned_sliders}
        expected_ids = {slider.id for slider in created_sliders if slider.is_active}
        self.assertEqual(returned_ids, expected_ids)
        
        # Property 5: Each slider should have required fields
        for slider in returned_sliders:
            self.assertTrue(hasattr(slider, 'title'))
            self.assertTrue(hasattr(slider, 'tagline'))
            self.assertTrue(hasattr(slider, 'is_active'))
            self.assertIsNotNone(slider.title)
            self.assertIsNotNone(slider.tagline)
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=200),
                'tagline': st.text(min_size=1, max_size=200),
                'is_active': st.just(False)  # Only inactive sliders
            }),
            min_size=1,
            max_size=5
        )
    )
    @settings(max_examples=100)
    def test_inactive_sliders_excluded_property(self, inactive_slider_data_list):
        """
        Test that inactive sliders are not included in the context
        """
        # Clean up any existing data
        HomeSlider.objects.all().delete()
        
        # Create inactive slider entries
        for slider_data in inactive_slider_data_list:
            HomeSlider.objects.create(**slider_data)
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        # Property: No inactive sliders should be returned
        returned_sliders = list(context['home_sliders'])
        self.assertEqual(len(returned_sliders), 0)
    
    def test_empty_sliders_handling(self):
        """
        Test graceful handling when no active sliders exist
        """
        # Clean up any existing data
        HomeSlider.objects.all().delete()
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        # Should still have home_sliders key with empty queryset
        self.assertIn('home_sliders', context)
        returned_sliders = list(context['home_sliders'])
        self.assertEqual(len(returned_sliders), 0)
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=200),
                'tagline': st.text(min_size=1, max_size=200),
                'is_active': st.booleans()  # Mix of active and inactive
            }),
            min_size=2,
            max_size=10
        )
    )
    @settings(max_examples=100)
    def test_mixed_active_inactive_sliders_property(self, mixed_slider_data_list):
        """
        Test that only active sliders are returned when mix of active/inactive exist
        """
        # Clean up any existing data
        HomeSlider.objects.all().delete()
        
        # Create mixed slider entries
        active_count = 0
        for slider_data in mixed_slider_data_list:
            HomeSlider.objects.create(**slider_data)
            if slider_data['is_active']:
                active_count += 1
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        # Property: Only active sliders should be returned
        returned_sliders = list(context['home_sliders'])
        self.assertEqual(len(returned_sliders), active_count)
        
        # All returned sliders must be active
        for slider in returned_sliders:
            self.assertTrue(slider.is_active)