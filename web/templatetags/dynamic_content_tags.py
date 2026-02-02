"""
Custom template filters and tags for dynamic content
"""
from django import template
from django.utils.safestring import mark_safe
from django.utils.html import strip_tags
import re

register = template.Library()


@register.filter
def truncate_words_html(value, arg):
    """
    Truncate HTML content to specified number of words while preserving HTML structure
    """
    if not value:
        return ""
    
    try:
        word_count = int(arg)
    except (ValueError, TypeError):
        return value
    
    # Strip HTML tags for word counting
    text_only = strip_tags(value)
    words = text_only.split()
    
    if len(words) <= word_count:
        return value
    
    # Truncate and add ellipsis
    truncated_words = words[:word_count]
    truncated_text = ' '.join(truncated_words) + '...'
    
    return mark_safe(truncated_text)


@register.filter
def format_tags(value):
    """
    Convert comma-separated tags to a list of strings
    """
    if not value:
        return []
    
    try:
        return [tag.strip() for tag in value.split(',') if tag.strip()]
    except (AttributeError, TypeError):
        return []


@register.filter
def default_image(value, default_path="img/placeholder.jpg"):
    """
    Provide fallback image path if the image field is empty or None
    """
    if value and hasattr(value, 'url'):
        try:
            return value.url
        except (ValueError, AttributeError):
            return f"/static/{default_path}"
    return f"/static/{default_path}"


@register.filter
def format_currency(value, currency_symbol="$"):
    """
    Format salary ranges or currency values
    """
    if not value:
        return ""
    
    try:
        # Handle decimal values
        if hasattr(value, '__float__'):
            return f"{currency_symbol}{value:,.2f}"
        # Handle string values
        return f"{currency_symbol}{value}"
    except (ValueError, TypeError):
        return str(value)


@register.simple_tag
def social_icon(platform, url):
    """
    Generate social media icon HTML
    """
    if not url:
        return ""
    
    icon_classes = {
        'facebook': 'fab fa-facebook-f',
        'twitter': 'fab fa-twitter',
        'instagram': 'fab fa-instagram',
        'linkedin': 'fab fa-linkedin-in',
        'youtube': 'fab fa-youtube',
        'github': 'fab fa-github',
    }
    
    platform_lower = platform.lower()
    icon_class = icon_classes.get(platform_lower, 'fas fa-link')
    
    html = f'''
    <a href="{url}" target="_blank" rel="noopener noreferrer" class="social-link">
        <i class="{icon_class}"></i>
    </a>
    '''
    
    return mark_safe(html)


@register.filter
def get_rating_stars(rating):
    """
    Convert numeric rating to star display
    """
    if not rating:
        return ""
    
    try:
        rating_int = int(rating)
        stars_html = ""
        
        for i in range(5):
            if i < rating_int:
                stars_html += '<i class="fas fa-star"></i>'
            else:
                stars_html += '<i class="far fa-star"></i>'
        
        return mark_safe(stars_html)
    except (ValueError, TypeError):
        return ""


@register.filter
def safe_filename(value):
    """
    Generate safe filename for downloads
    """
    if not value:
        return ""
    
    # Remove unsafe characters and replace with underscores
    safe_name = re.sub(r'[^\w\s-]', '', str(value))
    safe_name = re.sub(r'[-\s]+', '_', safe_name)
    
    safe_name = re.sub(r'[-\s]+', '_', safe_name)
    
    return safe_name.strip('_')

@register.filter
def get_range(value):
    """
    Return a range object for iteration in templates
    """
    try:
        return range(int(value))
    except (ValueError, TypeError):
        return range(0)