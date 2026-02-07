"""
Property-based tests for Service data rendering functionality
**Feature: dynamic-content-integration, Property 3: Service Data Rendering**
**Validates: Requirements 1.3, 3.3**
"""
from django.test import TestCase, RequestFactory
from django.template import Context, Template
from hypothesis import given, strategies as st, settings, HealthCheck
from hypothesis.extra.django import TestCase as HypothesisTestCase

from .views import IndexView
from .models import Service
from .templatetags.dynamic_content_tags import format_tags, default_image, truncate_words_html


class ServiceRenderingPropertyTest(HypothesisTestCase):
    """Property-based tests for Service data rendering on homepage"""
    
    def setUp(self):
        self.factory = RequestFactory()
        self.view = IndexView()
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=200, alphabet=st.characters(blacklist_categories=('Cc', 'Cs'))).filter(lambda x: x.strip()),
                'description': st.text(min_size=10, max_size=1000, alphabet=st.characters(blacklist_categories=('Cc', 'Cs'))).filter(lambda x: x.strip()),
                'icon': st.text(min_size=1, max_size=100, alphabet=st.characters(blacklist_categories=('Cc', 'Cs'))).filter(lambda x: x.strip()),
                'badge': st.text(min_size=0, max_size=50),
                'tags': st.text(min_size=0, max_size=200),
            }),
            min_size=1,
            max_size=8
        )
    )
    @settings(max_examples=100, suppress_health_check=[HealthCheck.filter_too_much])
    def test_service_data_rendering_property(self, service_data_list):
        """
        **Feature: dynamic-content-integration, Property 3: Service Data Rendering**
        **Validates: Requirements 1.3, 3.3**
        
        For any Service model entries, the homepage should retrieve and display them 
        with proper formatting including icons, descriptions, and tags
        """
        # Clean up any existing data
        Service.objects.all().delete()
        
        # Create test service entries
        created_services = []
        for service_data in service_data_list:
            service = Service.objects.create(**service_data)
            created_services.append(service)
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        # Property 1: Context should contain services key
        self.assertIn('services', context)
        
        # Property 2: Number of returned services should match services in database
        returned_services = list(context['services'])
        total_services = Service.objects.count()
        self.assertEqual(len(returned_services), total_services)
        
        # Property 3: All created services should be in the context
        returned_ids = {service.id for service in returned_services}
        expected_ids = {service.id for service in created_services}
        self.assertEqual(returned_ids, expected_ids)
        
        # Property 4: Each service should have all required fields for rendering
        for service in returned_services:
            self.assertTrue(hasattr(service, 'title'))
            self.assertTrue(hasattr(service, 'description'))
            self.assertTrue(hasattr(service, 'icon'))
            self.assertTrue(hasattr(service, 'badge'))
            self.assertTrue(hasattr(service, 'tags'))
            self.assertIsNotNone(service.title)
            self.assertIsNotNone(service.description)
            self.assertIsNotNone(service.icon)
            # badge and tags can be empty strings, so we check they exist
            self.assertTrue(hasattr(service, 'badge'))
            self.assertTrue(hasattr(service, 'tags'))
        
        # Property 5: Service titles should be non-empty strings
        for service in returned_services:
            self.assertIsInstance(service.title, str)
            self.assertGreater(len(service.title.strip()), 0)
        
        # Property 6: Service descriptions should be non-empty strings
        for service in returned_services:
            self.assertIsInstance(service.description, str)
            self.assertGreater(len(service.description.strip()), 0)
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=200),
                'description': st.text(min_size=10, max_size=1000),
                'icon': st.text(min_size=1, max_size=100),
                'badge': st.text(min_size=1, max_size=50),
                'tags': st.one_of(
                    st.just('commercial, residential'),
                    st.just('infrastructure, roads, buildings'),
                    st.just('construction, engineering'),
                    st.just('tag1, tag2, tag3'),
                    st.just('single_tag'),
                    st.just('a, b, c, d')
                ),
            }),
            min_size=1,
            max_size=5
        )
    )
    @settings(max_examples=100)
    def test_service_tag_formatting_property(self, service_data_list):
        """
        Test that service tags are properly formatted using the format_tags filter
        """
        # Clean up any existing data
        Service.objects.all().delete()
        
        # Create test service entries with tags
        created_services = []
        for service_data in service_data_list:
            service = Service.objects.create(**service_data)
            created_services.append(service)
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        returned_services = list(context['services'])
        
        # Property: Services with tags should have properly formatted tag lists
        for service in returned_services:
            if service.tags:
                # Test the format_tags filter directly
                formatted_tags = format_tags(service.tags)
                self.assertIsInstance(formatted_tags, list)
                
                # Each tag should be a non-empty string
                for tag in formatted_tags:
                    self.assertIsInstance(tag, str)
                    self.assertGreater(len(tag.strip()), 0)
                
                # Number of tags should match comma-separated count
                expected_tag_count = len([t.strip() for t in service.tags.split(',') if t.strip()])
                self.assertEqual(len(formatted_tags), expected_tag_count)
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=200),
                'description': st.text(min_size=50, max_size=1000),  # Longer descriptions for truncation testing
                'icon': st.text(min_size=1, max_size=100),
                'badge': st.text(min_size=0, max_size=50),
                'tags': st.text(min_size=0, max_size=200),
            }),
            min_size=1,
            max_size=5
        )
    )
    @settings(max_examples=100)
    def test_service_description_truncation_property(self, service_data_list):
        """
        Test that service descriptions are properly truncated using truncate_words_html filter
        """
        # Clean up any existing data
        Service.objects.all().delete()
        
        # Create test service entries
        for service_data in service_data_list:
            Service.objects.create(**service_data)
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        returned_services = list(context['services'])
        
        # Property: Description truncation should work correctly
        for service in returned_services:
            if service.description:
                # Test truncation with 20 words (as used in template)
                truncated = truncate_words_html(service.description, 20)
                
                # Should return a string
                self.assertIsInstance(truncated, str)
                
                # If original has more than 20 words, truncated should be shorter
                original_words = service.description.split()
                if len(original_words) > 20:
                    self.assertLess(len(truncated), len(service.description))
                    self.assertTrue(truncated.endswith('...'))
                else:
                    # If 20 words or less, should return original
                    self.assertEqual(truncated, service.description)
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=200),
                'description': st.text(min_size=10, max_size=1000),
                'icon': st.text(min_size=1, max_size=100),
                'badge': st.text(min_size=0, max_size=50),
                'tags': st.text(min_size=0, max_size=200),
            }),
            min_size=1,
            max_size=5
        )
    )
    @settings(max_examples=100)
    def test_service_icon_rendering_property(self, service_data_list):
        """
        Test that service icons are properly handled and have fallback values
        """
        # Clean up any existing data
        Service.objects.all().delete()
        
        # Create test service entries
        for service_data in service_data_list:
            Service.objects.create(**service_data)
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        returned_services = list(context['services'])
        
        # Property: Each service should have an icon field that can be used in templates
        for service in returned_services:
            # Icon should be a string (even if empty)
            self.assertIsInstance(service.icon, str)
            
            # Test that the icon field exists and can be accessed
            icon_value = service.icon if service.icon else 'icon-workstations'  # Default from template
            self.assertIsInstance(icon_value, str)
            self.assertGreater(len(icon_value), 0)
    
    def test_empty_services_handling(self):
        """
        Test graceful handling when no services exist
        """
        # Clean up any existing data
        Service.objects.all().delete()
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        # Should still have services key with empty queryset
        self.assertIn('services', context)
        returned_services = list(context['services'])
        self.assertEqual(len(returned_services), 0)
    
    @given(
        st.lists(
            st.fixed_dictionaries({
                'title': st.text(min_size=1, max_size=200),
                'description': st.text(min_size=10, max_size=1000),
                'icon': st.text(min_size=1, max_size=100),
                'badge': st.one_of(st.text(min_size=1, max_size=50), st.just('')),  # Mix of badges and empty
                'tags': st.one_of(st.text(min_size=5, max_size=200), st.just('')),  # Mix of tags and empty
            }),
            min_size=1,
            max_size=5
        )
    )
    @settings(max_examples=100)
    def test_service_optional_fields_property(self, service_data_list):
        """
        Test that optional fields (badge, tags) are handled correctly when empty or present
        """
        # Clean up any existing data
        Service.objects.all().delete()
        
        # Create test service entries
        for service_data in service_data_list:
            Service.objects.create(**service_data)
        
        # Get context from view
        request = self.factory.get('/')
        context = self.view.get_context_data()
        
        returned_services = list(context['services'])
        
        # Property: Optional fields should be handled gracefully
        for service in returned_services:
            # Badge can be empty string or have content
            self.assertIsInstance(service.badge, str)
            
            # Tags can be empty string or have content
            self.assertIsInstance(service.tags, str)
            
            # If tags exist, format_tags should work
            if service.tags.strip():
                formatted_tags = format_tags(service.tags)
                self.assertIsInstance(formatted_tags, list)
            else:
                formatted_tags = format_tags(service.tags)
                self.assertEqual(formatted_tags, [])
    
    def test_service_get_tags_list_method(self):
        """
        Test the Service model's get_tags_list method
        """
        # Test with tags
        service_with_tags = Service.objects.create(
            title="Test Service",
            description="Test description",
            icon="icon-test",
            tags="commercial, residential, institutional"
        )
        
        tags_list = service_with_tags.get_tags_list()
        self.assertEqual(tags_list, ['commercial', 'residential', 'institutional'])
        
        # Test without tags
        service_without_tags = Service.objects.create(
            title="Test Service 2",
            description="Test description 2",
            icon="icon-test2",
            tags=""
        )
        
        tags_list_empty = service_without_tags.get_tags_list()
        self.assertEqual(tags_list_empty, [])