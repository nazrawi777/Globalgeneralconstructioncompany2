
import logging
from unittest.mock import patch, MagicMock

from django.db import DatabaseError
from django.test import TestCase, override_settings
from django.views.generic import TemplateView
from hypothesis import given, strategies as st

from web.views import BaseDynamicView, IndexView, safe_model_query
from web.models import HomeSlider 

class TestBaseDynamicView(TestCase):
    """Tests for the BaseDynamicView class."""

    def test_get_dynamic_context_default_is_empty(self):
        """Ensures get_dynamic_context returns an empty dict by default."""
        view = BaseDynamicView()
        self.assertEqual(view.get_dynamic_context(), {})

    def test_get_context_data_merges_dynamic_context(self):
        """Ensures get_context_data correctly merges the dynamic context."""
        class MergingTestView(BaseDynamicView):
            def get_dynamic_context(self):
                return {'test_key': 'test_value'}
        
        view = MergingTestView()
        context = view.get_context_data()
        self.assertIn('test_key', context)
        self.assertEqual(context['test_key'], 'test_value')

    @patch('web.models.HomeSlider.objects.filter')
    def test_database_error_recovery_property(self, mock_filter):
        """
        Property 16: Database Error Recovery
        Validates: Requirements 7.1

        Ensures that when a database query fails, the view logs the error
        and returns an empty queryset, preventing the application from crashing.
        """
        # Simulate a database error when querying
        mock_filter.side_effect = DatabaseError("Simulated database error")

        class TestView(BaseDynamicView):
            def get_dynamic_context(self):
                # This query will fail due to the mock
                sliders = safe_model_query(HomeSlider)
                return {'sliders': sliders}
            
            def get_fallback_context(self):
                return {'sliders': []}

        view = TestView()
        
        with self.assertLogs('web.views', level='ERROR') as cm:
            context = view.get_context_data()
            # safe_model_query now catches the error and logs it.
            # The exception does not propagate to BaseDynamicView.
            # So we check the log from safe_model_query.
            self.assertEqual(len(cm.output), 1)
            self.assertIn("Database error in HomeSlider", cm.output[0])
            # And get_context_data should return the context from get_dynamic_context
            # which includes the empty queryset from safe_model_query.
            self.assertEqual(len(context['sliders']), 0)


@override_settings(ROOT_URLCONF='web.urls')
class TestDatabaseErrorIntegration(TestCase):
    """
    Integration test to verify database error handling within a request.
    """
    @patch('web.views.safe_model_query')
    def test_database_error_returns_fallback_content(self, mock_safe_model_query):
        """
        Property 16: Database Error Recovery
        Validates: Requirements 7.1

        When a DatabaseError occurs, the view should catch it, log it,
        and return a response with fallback content (empty queryset),
        preventing a 500 error.
        """
        mock_safe_model_query.side_effect = DatabaseError("Connection lost")

        with self.assertLogs('web.views', level='ERROR') as cm:
            response = self.client.get('/') 
            self.assertEqual(response.status_code, 200) 
            self.assertIn('Error getting dynamic context for IndexView', cm.output[0])
            self.assertIn('Connection lost', cm.output[0])
