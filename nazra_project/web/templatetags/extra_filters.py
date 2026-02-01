from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()

@register.filter
@stringfilter
def replace(value, arg):
    """Usage: {{ value|replace:"old|new" }}"""
    old, new = arg.split('|', 1)
    return value.replace(old, new)