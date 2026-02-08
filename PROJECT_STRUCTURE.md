# Django Project Structure

## Overview
This Django project follows standard Django conventions with proper separation of concerns.

## Directory Structure

```
project_root/
├── manage.py                  # Django management script
├── src/                       # Project configuration (settings, urls, wsgi, asgi)
│   ├── __init__.py
│   ├── settings.py           # Project settings (INSTALLED_APPS, MIDDLEWARE, etc.)
│   ├── urls.py               # Root URL configuration
│   ├── wsgi.py               # WSGI application
│   └── asgi.py               # ASGI application
├── main/                      # Main Django application
│   ├── __init__.py
│   ├── admin.py              # Admin interface configuration
│   ├── apps.py               # App configuration
│   ├── models.py             # Database models
│   ├── views.py              # View functions
│   ├── urls.py               # App-specific URL patterns
│   ├── forms.py              # Django forms
│   ├── utils.py              # Utility functions
│   ├── tests.py              # Unit tests
│   └── migrations/           # Database migrations
├── templates/                 # HTML templates
│   ├── jobs/                 # Job-related templates
│   ├── index.html            # Homepage
│   ├── finance.html          # Finance page
│   ├── socialwalfare.html    # Social welfare page
│   └── ...                   # Other page templates
├── assets/                    # Static assets (CSS, JS, images, fonts)
│   ├── css/
│   ├── js/
│   ├── img/
│   └── fonts/
├── media/                     # User-uploaded files
│   ├── slider/               # Homepage slider images
│   ├── testimonials/         # Testimonial images and attachments
│   ├── cvs/                  # Job application CVs
│   ├── projects/             # Project images
│   ├── finance/              # Finance-related uploads
│   ├── media_mosaic/         # Gallery media items
│   └── social_welfare/       # Social welfare story images
└── venv/                      # Virtual environment (not in version control)
```

## Configuration Details

### Settings (src/settings.py)
- **INSTALLED_APPS**: Includes 'main' app and all Django contrib apps
- **MIDDLEWARE**: Standard Django middleware stack
- **TEMPLATES**: Configured to use templates/ directory
- **STATIC_URL**: '/static/'
- **STATIC_ROOT**: 'staticfiles/' (for production collectstatic)
- **STATICFILES_DIRS**: ['assets/'] (development static files)
- **MEDIA_URL**: '/media/'
- **MEDIA_ROOT**: 'media/' (user uploads)

### URL Configuration
- Root URLs in src/urls.py
- App-specific URLs in main/urls.py (to be included in root)

### Database
- SQLite database (db.sqlite3) in project root
- Migrations stored in main/migrations/

## Next Steps
1. Define models in main/models.py
2. Create and run migrations
3. Configure admin interface in main/admin.py
4. Implement views in main/views.py
5. Set up URL routing
6. Convert HTML templates to Django templates
