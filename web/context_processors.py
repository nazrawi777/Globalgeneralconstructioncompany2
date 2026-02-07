"""
Template context processors for site-wide data
"""
import logging
from django.db import DatabaseError
from .models import CompanyStatistic, Partner, Service

logger = logging.getLogger(__name__)


def global_context(request):
    """Provides site-wide context data"""
    context = {}
    
    try:
        # Get company statistics for global display
        context['site_statistics'] = CompanyStatistic.objects.all().order_by('order')
    except DatabaseError as e:
        logger.error(f"Database error loading site statistics: {e}")
        context['site_statistics'] = []
    except Exception as e:
        logger.error(f"Unexpected error loading site statistics: {e}")
        context['site_statistics'] = []
    
    try:
        # Get active partners for global display
        context['active_partners'] = Partner.objects.all()
    except DatabaseError as e:
        logger.error(f"Database error loading partners: {e}")
        context['active_partners'] = []
    except Exception as e:
        logger.error(f"Unexpected error loading partners: {e}")
        context['active_partners'] = []
    
    try:
        # Get navigation services (limited to 5 for navigation)
        context['navigation_services'] = Service.objects.all()[:5]
    except DatabaseError as e:
        logger.error(f"Database error loading navigation services: {e}")
        context['navigation_services'] = []
    except Exception as e:
        logger.error(f"Unexpected error loading navigation services: {e}")
        context['navigation_services'] = []
    
    return context