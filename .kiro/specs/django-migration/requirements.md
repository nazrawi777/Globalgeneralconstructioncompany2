# Requirements Document

## Introduction

This document outlines the requirements for migrating a static HTML website to a Django-based web application while preserving the existing UI/UX design. The system will integrate existing Django models with HTML templates, create views and URL routing, configure static file handling, and implement dynamic content rendering without altering the visual appearance or user experience of the site.

## Glossary

- **Django Application**: The web application framework used to build the dynamic backend
- **Template System**: Django's template engine for rendering HTML with dynamic data
- **Static Files**: CSS, JavaScript, images, and other assets that don't change per request
- **View Function**: Python function that processes HTTP requests and returns responses
- **URL Pattern**: Django's routing mechanism that maps URLs to view functions
- **Model**: Django ORM class representing database tables
- **Context Data**: Python dictionary passed from views to templates containing dynamic data
- **Template Tag**: Django syntax for inserting dynamic content in HTML templates
- **Media Files**: User-uploaded content (images, documents, videos)
- **Admin Interface**: Django's built-in administrative interface for content management

## Requirements

### Requirement 1

**User Story:** As a site visitor, I want to view the homepage with dynamic content from the database, so that I see up-to-date information without noticing any visual changes from the original site.

#### Acceptance Criteria

1. WHEN a user visits the homepage THEN the system SHALL render the index.html template with data from HomeSlider, CompanyStatistic, and Partner models
2. WHEN the homepage loads THEN the system SHALL display all active slider items in the correct order
3. WHEN the homepage renders THEN the system SHALL maintain all original CSS classes, IDs, and HTML structure
4. WHEN static files are requested THEN the system SHALL serve them from the configured static files directory
5. WHEN media files are requested THEN the system SHALL serve uploaded content from the media directory

### Requirement 2

**User Story:** As a site visitor, I want to browse job listings with filtering capabilities, so that I can find relevant employment opportunities.

#### Acceptance Criteria

1. WHEN a user visits the jobs page THEN the system SHALL display all active JobVacancy records
2. WHEN a user filters by job type THEN the system SHALL return only vacancies matching the selected job type
3. WHEN a user filters by designation THEN the system SHALL return only vacancies matching the selected designation
4. WHEN a user views job details THEN the system SHALL display the complete job information including salary range, qualifications, and requirements
5. WHEN no jobs match the filter criteria THEN the system SHALL display an appropriate message

### Requirement 3

**User Story:** As a job seeker, I want to submit job applications through the website, so that I can apply for positions without changing my workflow.

#### Acceptance Criteria

1. WHEN a user submits the job application form THEN the system SHALL validate all required fields
2. WHEN form validation passes THEN the system SHALL create a JobApplication record in the database
3. WHEN a CV file is uploaded THEN the system SHALL store the file in the configured media directory
4. WHEN the application is submitted successfully THEN the system SHALL display a confirmation message
5. WHEN form validation fails THEN the system SHALL display field-specific error messages without losing entered data

### Requirement 4

**User Story:** As a site visitor, I want to view testimonials and reviews, so that I can learn about others' experiences with the organization.

#### Acceptance Criteria

1. WHEN a user visits a page with testimonials THEN the system SHALL display all Testimonial records
2. WHEN testimonials are rendered THEN the system SHALL include client name, role, review text, and rating
3. WHEN a testimonial has an image THEN the system SHALL display the image using the correct media URL
4. WHEN a testimonial has an attachment THEN the system SHALL provide a download link
5. WHEN testimonials are displayed THEN the system SHALL maintain the original carousel or grid layout

### Requirement 5

**User Story:** As a site visitor, I want to view financial information and project portfolios, so that I can understand the organization's financial performance.

#### Acceptance Criteria

1. WHEN a user visits the finance page THEN the system SHALL display the active FinancialMetrics data
2. WHEN fiscal year data is requested THEN the system SHALL display all FiscalYear records ordered correctly
3. WHEN project data is displayed THEN the system SHALL show FinanceProject records grouped by fiscal year
4. WHEN portfolio status is rendered THEN the system SHALL calculate and display percentage breakdowns
5. WHEN financial values are displayed THEN the system SHALL format them using the model's formatting methods

### Requirement 6

**User Story:** As a site visitor, I want to view media galleries with images and videos, so that I can explore visual content about the organization.

#### Acceptance Criteria

1. WHEN a user visits a gallery page THEN the system SHALL display all active MediaMosaicItem records
2. WHEN media items are filtered by category THEN the system SHALL return only items matching the category
3. WHEN a video item is displayed THEN the system SHALL show the thumbnail image with a play indicator
4. WHEN an image item is displayed THEN the system SHALL render the image directly
5. WHEN media items are rendered THEN the system SHALL maintain the original mosaic layout

### Requirement 7

**User Story:** As a site visitor, I want to view social welfare stories, so that I can learn about the organization's community initiatives.

#### Acceptance Criteria

1. WHEN a user visits the social welfare page THEN the system SHALL display all active SocialWelfareStory records
2. WHEN stories are rendered THEN the system SHALL display them in the specified order
3. WHEN a story has a link THEN the system SHALL provide a clickable element to the full story
4. WHEN the carousel loads THEN the system SHALL initialize with the correct JavaScript functionality
5. WHEN stories are displayed THEN the system SHALL maintain the original carousel design

### Requirement 8

**User Story:** As a site visitor, I want to interact with an AI chatbot, so that I can get quick answers about the organization.

#### Acceptance Criteria

1. WHEN a user sends a message to the chatbot THEN the system SHALL retrieve the active ChatBotConfig context
2. WHEN the chatbot processes a message THEN the system SHALL send the request to the Gemini API with the configured context
3. WHEN the API returns a response THEN the system SHALL return the response text to the user
4. WHEN the API key is missing THEN the system SHALL return an appropriate error message
5. WHEN an API error occurs THEN the system SHALL log the error and return a user-friendly message

### Requirement 9

**User Story:** As a content administrator, I want to manage all site content through Django admin, so that I can update the website without technical knowledge.

#### Acceptance Criteria

1. WHEN an administrator accesses the admin interface THEN the system SHALL display all registered models
2. WHEN an administrator creates or edits content THEN the system SHALL validate the data according to model constraints
3. WHEN an administrator uploads media files THEN the system SHALL store them in the correct upload directories
4. WHEN an administrator saves changes THEN the system SHALL immediately reflect the changes on the public site
5. WHEN model validation fails THEN the system SHALL display clear error messages in the admin interface

### Requirement 10

**User Story:** As a developer, I want a properly configured Django project structure, so that the application is maintainable and follows best practices.

#### Acceptance Criteria

1. WHEN the project is initialized THEN the system SHALL have a settings.py file with correct STATIC_URL, STATIC_ROOT, MEDIA_URL, and MEDIA_ROOT configurations
2. WHEN the project structure is created THEN the system SHALL have separate directories for templates, static files, and media files
3. WHEN URL routing is configured THEN the system SHALL have a urls.py file mapping all page routes to appropriate views
4. WHEN the application starts THEN the system SHALL load all required middleware and installed apps
5. WHEN templates are rendered THEN the system SHALL use Django's template inheritance to avoid code duplication
