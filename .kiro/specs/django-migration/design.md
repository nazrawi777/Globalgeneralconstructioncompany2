# Design Document

## Overview

This design document outlines the architecture for migrating a static HTML website to a Django-based web application. The migration will preserve all existing UI/UX elements while adding dynamic content management capabilities through Django's ORM, template system, and admin interface. The system will follow Django best practices with a clear separation between models (data layer), views (business logic), templates (presentation), and static files (assets).

## Architecture

### High-Level Architecture

The application follows Django's MVT (Model-View-Template) pattern:

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────────┐
│   URL Dispatcher    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   View Functions    │◄──────┐
└──────┬──────────────┘       │
       │                      │
       ├──────────────────────┤
       │                      │
       ▼                      │
┌─────────────────────┐       │
│   Django Models     │       │
│   (Database ORM)    │       │
└─────────────────────┘       │
                              │
       ┌──────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Django Templates   │
│  (HTML + Tags)      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Static/Media Files │
└─────────────────────┘
```

### Project Structure

```
project_root/
├── manage.py
├── config/                    # Project configuration
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── main/                      # Main application
│   ├── __init__.py
│   ├── models.py             # Existing models
│   ├── views.py              # View functions
│   ├── urls.py               # App-specific URLs
│   ├── forms.py              # Existing forms
│   ├── admin.py              # Admin configuration
│   └── utils.py              # Existing chatbot utilities
├── templates/                 # HTML templates
│   ├── base.html             # Base template
│   ├── index.html            # Homepage
│   ├── jobs/
│   │   ├── job-list.html
│   │   └── job-detail.html
│   ├── finance.html
│   ├── socialwalfare.html
│   └── ...
├── static/                    # Static files (existing assets/)
│   ├── css/
│   ├── js/
│   ├── img/
│   └── fonts/
└── media/                     # User uploads
    ├── slider/
    ├── testimonials/
    ├── cvs/
    └── ...
```

## Components and Interfaces

### 1. URL Configuration

**Main URLs (config/urls.py)**
- Maps root-level URL patterns to app-specific URL configurations
- Configures static and media file serving for development
- Includes admin interface at `/admin/`

**App URLs (main/urls.py)**
- Homepage: `/` → `home_view`
- Jobs: `/jobs/` → `job_list_view`
- Job Detail: `/jobs/<int:pk>/` → `job_detail_view`
- Job Apply: `/job-apply/` → `job_apply_view`
- Finance: `/finance/` → `finance_view`
- Social Welfare: `/socialwalfare/` → `social_welfare_view`
- Projects: `/project/` → `project_view`
- About: `/about/` → `about_view`
- Services: `/services/` → `services_view`
- Team: `/ourteam/` → `team_view`
- Blog: `/blog/` → `blog_view`
- Contact: `/contact/` → `contact_view`
- Chatbot API: `/api/chatbot/` → `chatbot_api_view`

### 2. View Functions

**Homepage View (`home_view`)**
```python
def home_view(request):
    context = {
        'sliders': HomeSlider.objects.filter(is_active=True).order_by('created_at'),
        'statistics': CompanyStatistic.objects.all(),
        'partners': Partner.objects.all(),
        'testimonials': Testimonial.objects.all()[:3],
    }
    return render(request, 'index.html', context)
```

**Job List View (`job_list_view`)**
```python
def job_list_view(request):
    jobs = JobVacancy.objects.all()
    
    # Filter by job type
    job_type = request.GET.get('job_type')
    if job_type and job_type != 'All Jobs':
        jobs = jobs.filter(job_type=job_type)
    
    # Filter by designation
    designation = request.GET.get('designation')
    if designation:
        jobs = jobs.filter(designation=designation)
    
    context = {
        'jobs': jobs,
        'job_types': JobVacancy.JOB_TYPE_CHOICES,
        'designations': JobVacancy.DESIGNATION_CHOICES,
    }
    return render(request, 'jobs/job-list.html', context)
```

**Job Application View (`job_apply_view`)**
```python
def job_apply_view(request):
    if request.method == 'POST':
        form = JobApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Application submitted successfully!')
            return redirect('job_list')
    else:
        form = JobApplicationForm()
    
    context = {'form': form}
    return render(request, 'job-apply.html', context)
```

**Finance View (`finance_view`)**
```python
def finance_view(request):
    context = {
        'metrics': FinancialMetrics.objects.filter(is_active=True).first(),
        'fiscal_years': FiscalYear.objects.filter(is_active=True),
        'portfolio_status': PortfolioStatus.objects.filter(is_active=True).first(),
        'outstanding_projects': FinanceProject.objects.filter(is_outstanding=True),
    }
    return render(request, 'finance.html', context)
```

**Chatbot API View (`chatbot_api_view`)**
```python
@require_http_methods(["POST"])
def chatbot_api_view(request):
    try:
        data = json.loads(request.body)
        user_message = data.get('message', '')
        
        if not user_message:
            return JsonResponse({'error': 'Message is required'}, status=400)
        
        response = get_gemini_response(user_message)
        return JsonResponse({'response': response})
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
```

### 3. Template System

**Base Template (base.html)**
- Contains common HTML structure (head, navigation, footer)
- Defines blocks for page-specific content
- Loads static files using `{% load static %}`
- Includes common CSS and JavaScript

**Template Inheritance Pattern**
```django
{% extends 'base.html' %}
{% load static %}

{% block title %}Page Title{% endblock %}

{% block content %}
<!-- Page-specific content -->
{% endblock %}
```

**Template Tags for Dynamic Content**
- `{{ variable }}` - Output variable
- `{% for item in items %}` - Loop through querysets
- `{% if condition %}` - Conditional rendering
- `{% url 'view_name' %}` - Generate URLs
- `{{ MEDIA_URL }}{{ object.image }}` - Media file URLs
- `{% static 'path/to/file' %}` - Static file URLs

### 4. Admin Configuration

**Admin Registration (admin.py)**
```python
@admin.register(HomeSlider)
class HomeSliderAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['title', 'tagline']

@admin.register(JobVacancy)
class JobVacancyAdmin(admin.ModelAdmin):
    list_display = ['title', 'designation', 'job_type', 'posted_date']
    list_filter = ['job_type', 'designation', 'industry']
    search_fields = ['title', 'description']
    date_hierarchy = 'posted_date'

# Similar registrations for all models
```

## Data Models

The existing models are already well-defined. Key relationships:

- **FiscalYear** ← **FinanceProject** (One-to-Many)
- **JobVacancy** → **JobApplication** (Implicit relationship via job_title field)
- **ChatBotConfig** (Singleton pattern with is_active flag)
- **FinancialMetrics** (Singleton pattern with is_active flag)
- **PortfolioStatus** (Singleton pattern with is_active flag)

All models include appropriate field types, choices, validation, and helper methods for formatting display values.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

After reviewing the acceptance criteria, I've identified properties that can be tested through property-based testing. Many requirements involve UI/visual aspects that require human verification, while others are one-time setup tasks. The following properties focus on testable business logic and data handling:

**Property 1: Active item filtering consistency**
*For any* set of model instances with an `is_active` field, querying with `filter(is_active=True)` should return only items where `is_active=True`
**Validates: Requirements 1.2, 6.1, 7.1**

**Property 2: Job filtering by type**
*For any* set of JobVacancy records and any valid job_type, filtering by that job_type should return only vacancies where the job_type field matches the filter value
**Validates: Requirements 2.2**

**Property 3: Job filtering by designation**
*For any* set of JobVacancy records and any valid designation, filtering by that designation should return only vacancies where the designation field matches the filter value
**Validates: Requirements 2.3**

**Property 4: Job detail completeness**
*For any* JobVacancy instance, rendering the detail view should include all required fields: title, salary range (min_salary, max_salary), qualifications, and requirements (description)
**Validates: Requirements 2.4**

**Property 5: Form validation for required fields**
*For any* JobApplicationForm with one or more required fields missing, form validation should fail and return field-specific errors
**Validates: Requirements 3.1, 3.5**

**Property 6: Application creation on valid submission**
*For any* valid JobApplicationForm data, saving the form should create exactly one JobApplication record in the database
**Validates: Requirements 3.2**

**Property 7: File upload path correctness**
*For any* uploaded CV file through JobApplicationForm, the file should be stored in a path starting with the configured MEDIA_ROOT/cvs/ directory
**Validates: Requirements 3.3**

**Property 8: Testimonial field completeness**
*For any* Testimonial instance, rendering should include all required fields: client_name, client_role, review, and rating
**Validates: Requirements 4.2**

**Property 9: Media URL formatting for images**
*For any* model instance with an ImageField, the rendered template should include the MEDIA_URL prefix in the image path
**Validates: Requirements 4.3**

**Property 10: Attachment link presence**
*For any* Testimonial with a non-empty attachment field, the rendered output should contain a link element referencing the attachment
**Validates: Requirements 4.4**

**Property 11: Fiscal year ordering**
*For any* set of FiscalYear records, querying with the default ordering should return records sorted by order field (ascending) then year (descending)
**Validates: Requirements 5.2**

**Property 12: Project grouping by fiscal year**
*For any* set of FinanceProject records with fiscal_year relationships, grouping by fiscal_year should place all projects with the same fiscal_year together
**Validates: Requirements 5.3**

**Property 13: Portfolio percentage calculation accuracy**
*For any* PortfolioStatus instance, the sum of get_completed_percentage(), get_ongoing_percentage(), and get_priority_percentage() should equal 100 (or 0 if all counts are 0)
**Validates: Requirements 5.4**

**Property 14: Financial value formatting**
*For any* financial value >= 1,000,000,000, the formatting method should return a string containing "B ETB"; for values >= 1,000,000, it should contain "M ETB"
**Validates: Requirements 5.5**

**Property 15: Media category filtering**
*For any* set of MediaMosaicItem records and any category value, filtering by that category should return only items where the category field matches
**Validates: Requirements 6.2**

**Property 16: Video thumbnail rendering**
*For any* MediaMosaicItem with type="video", the rendered output should include the thumbnail image URL
**Validates: Requirements 6.3**

**Property 17: Image direct rendering**
*For any* MediaMosaicItem with type="image", the rendered output should include the src file URL
**Validates: Requirements 6.4**

**Property 18: Story ordering consistency**
*For any* set of SocialWelfareStory records, querying with default ordering should return records sorted by order field (ascending) then created_at (descending)
**Validates: Requirements 7.2**

**Property 19: Story link conditional rendering**
*For any* SocialWelfareStory, if the link field is non-empty, the rendered output should contain an anchor tag; if empty, no anchor tag should be present
**Validates: Requirements 7.3**

**Property 20: Active chatbot config retrieval**
*For any* chatbot message request, the system should retrieve the ChatBotConfig instance where is_active=True
**Validates: Requirements 8.1**

**Property 21: Chatbot context inclusion**
*For any* user message sent to the chatbot, the request to the Gemini API should include the context from the active ChatBotConfig
**Validates: Requirements 8.2**

**Property 22: Chatbot response passthrough**
*For any* successful Gemini API response, the chatbot view should return a JSON response containing the API's response text
**Validates: Requirements 8.3**

**Property 23: Chatbot error handling**
*For any* API error during chatbot processing, the system should return a user-friendly error message (not exposing internal error details)
**Validates: Requirements 8.5**

**Property 24: Admin model validation**
*For any* model instance with validation constraints, attempting to save invalid data through the admin should trigger validation errors
**Validates: Requirements 9.2**

**Property 25: Admin media upload paths**
*For any* model with FileField or ImageField, uploading a file through admin should store it in the path specified by the field's upload_to parameter
**Validates: Requirements 9.3**

**Property 26: Database change visibility**
*For any* model instance modified through admin, querying that instance immediately after save should return the updated values
**Validates: Requirements 9.4**

**Property 27: Admin validation error display**
*For any* invalid model data submitted through admin, the response should contain error messages corresponding to the validation failures
**Validates: Requirements 9.5**

## Error Handling

### Form Validation Errors
- All forms must validate required fields and display field-specific error messages
- File upload forms must validate file types and sizes
- Form errors should preserve user input to avoid data loss
- Use Django's built-in form validation and error rendering

### Database Errors
- Handle DoesNotExist exceptions when querying single objects (use `.first()` or try/except)
- Handle MultipleObjectsReturned for singleton models (enforced by model save methods)
- Use database transactions for operations that modify multiple records
- Log database errors for debugging while showing user-friendly messages

### File Handling Errors
- Validate file uploads before saving (file type, size, format)
- Handle missing media files gracefully (show placeholder or skip rendering)
- Ensure proper permissions on media directories
- Use Django's storage backend for file operations

### API Errors (Chatbot)
- Check for API key presence before making requests
- Catch and log all API exceptions
- Return user-friendly error messages without exposing internal details
- Implement timeout handling for API requests
- Consider rate limiting for API calls

### Template Errors
- Use template filters with default values: `{{ value|default:"N/A" }}`
- Check for None values before accessing object attributes
- Use `{% if object %}` guards for optional relationships
- Handle empty querysets gracefully in loops

### Configuration Errors
- Validate settings.py configuration on startup
- Ensure STATIC_ROOT, MEDIA_ROOT directories exist
- Check for required environment variables (API keys)
- Provide clear error messages for misconfiguration

## Testing Strategy

### Dual Testing Approach

This project will use both unit testing and property-based testing to ensure comprehensive coverage:

- **Unit tests** verify specific examples, edge cases, and integration points
- **Property-based tests** verify universal properties across all inputs
- Together they provide complete coverage: unit tests catch concrete bugs, property tests verify general correctness

### Property-Based Testing

**Framework**: We'll use **Hypothesis** for Python, which is the standard property-based testing library for Django applications.

**Configuration**: Each property-based test will run a minimum of 100 iterations to ensure thorough coverage of the input space.

**Test Tagging**: Each property-based test must include a comment explicitly referencing the correctness property from this design document using the format:
```python
# Feature: django-migration, Property 1: Active item filtering consistency
```

**Property Implementation**: Each correctness property listed above must be implemented as a single property-based test. The test should:
1. Generate random valid inputs using Hypothesis strategies
2. Execute the system behavior
3. Assert the property holds true

**Example Property Test**:
```python
from hypothesis import given, strategies as st
from hypothesis.extra.django import TestCase

class JobFilteringTests(TestCase):
    # Feature: django-migration, Property 2: Job filtering by type
    @given(st.sampled_from(['Full Time', 'Half Time', 'Remote', 'In Office']))
    def test_job_type_filtering(self, job_type):
        # Create random jobs with various types
        # Filter by job_type
        # Assert all results have matching job_type
        pass
```

### Unit Testing

**Framework**: Django's built-in TestCase class with Python's unittest

**Coverage Areas**:
- View functions return correct status codes and templates
- URL routing maps correctly to views
- Form validation for specific edge cases (empty strings, special characters)
- Model methods (formatting functions, custom save logic)
- Admin configuration (model registration, list_display)
- Static and media file serving in development
- Template rendering with specific context data

**Example Unit Test**:
```python
from django.test import TestCase, Client
from django.urls import reverse

class HomepageTests(TestCase):
    def test_homepage_loads(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')
```

### Integration Testing

- Test complete user workflows (browse jobs → view details → apply)
- Test admin workflows (login → create content → verify on public site)
- Test file upload workflows (upload CV → verify file exists → verify in admin)
- Test chatbot workflow (send message → receive response)

### Test Data Management

- Use Django fixtures for consistent test data
- Use factory_boy or Hypothesis for generating test instances
- Clean up uploaded files after tests
- Use Django's TestCase for automatic database rollback

### Testing Priorities

1. **Critical Path**: Homepage, job listings, job applications, admin interface
2. **Data Integrity**: Form validation, file uploads, database constraints
3. **Business Logic**: Filtering, ordering, calculations (percentages, formatting)
4. **Error Handling**: Missing data, invalid inputs, API failures
5. **Configuration**: Settings, URL routing, static/media serving

