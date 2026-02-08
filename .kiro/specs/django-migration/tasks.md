# Implementation Plan

- [ ] 1. Set up Django project structure






  - Create Django project with proper directory structure (config/, main/, templates/, static/, media/)
  - Configure settings.py with STATIC_URL, STATIC_ROOT, MEDIA_URL, MEDIA_ROOT
  - Set up INSTALLED_APPS and MIDDLEWARE
  - Configure TEMPLATES with correct directories
  - _Requirements: 10.1, 10.2, 10.4_

- [ ] 2. Integrate existing models and forms




  - Move existing models.py to main/models.py
  - Move existing forms.py to main/forms.py
  - Move existing utils.py (chatbot) to main/utils.py
  - Run migrations to create database tables
  - _Requirements: 10.1_

- [ ] 3. Configure admin interface



  - Create admin.py with registrations for all models
  - Configure list_display, list_filter, search_fields for each model
  - Add date_hierarchy where appropriate
  - Test admin interface accessibility
  - _Requirements: 9.1, 9.2, 9.5_

- [ ]* 3.1 Write property test for admin validation
  - **Property 24: Admin model validation**
  - **Validates: Requirements 9.2**

- [ ]* 3.2 Write property test for admin media uploads
  - **Property 25: Admin media upload paths**
  - **Validates: Requirements 9.3**

- [ ]* 3.3 Write property test for database change visibility
  - **Property 26: Database change visibility**
  - **Validates: Requirements 9.4**

- [ ]* 3.4 Write property test for admin validation errors
  - **Property 27: Admin validation error display**
  - **Validates: Requirements 9.5**

- [ ] 4. Set up URL routing
  - Create config/urls.py with main URL patterns
  - Create main/urls.py with app-specific routes
  - Configure static and media file serving for development
  - Map all page routes to view functions
  - _Requirements: 10.3_

- [ ]* 4.1 Write unit tests for URL routing
  - Test that all URLs resolve to correct views
  - Test URL reverse lookups
  - _Requirements: 10.3_

- [ ] 5. Create base template and static file structure
  - Move existing HTML files to templates/
  - Move assets/ directory contents to static/
  - Add {% load static %} and update all static file references
  - Set up template blocks for inheritance
  - _Requirements: 1.3, 1.4, 10.5_

- [ ]* 5.1 Write unit test for static file serving
  - Test that static files are accessible
  - _Requirements: 1.4_

- [ ] 6. Implement homepage view and template
  - Create home_view in views.py
  - Query HomeSlider, CompanyStatistic, Partner, Testimonial models
  - Pass context data to template
  - Convert index.html to use Django template tags
  - Replace static content with dynamic {{ variables }} and {% for %} loops
  - _Requirements: 1.1, 1.2_

- [ ]* 6.1 Write property test for active item filtering
  - **Property 1: Active item filtering consistency**
  - **Validates: Requirements 1.2**

- [ ]* 6.2 Write unit test for homepage view
  - Test homepage returns 200 status
  - Test correct template is used
  - Test context contains expected data
  - _Requirements: 1.1_

- [ ] 7. Implement job listing view and template
  - Create job_list_view with filtering logic
  - Handle job_type and designation query parameters
  - Convert job-list.html to Django template
  - Add dynamic job data rendering with {% for job in jobs %}
  - Display filter options from model choices
  - _Requirements: 2.1, 2.2, 2.3, 2.5_

- [ ]* 7.1 Write property test for job type filtering
  - **Property 2: Job filtering by type**
  - **Validates: Requirements 2.2**

- [ ]* 7.2 Write property test for job designation filtering
  - **Property 3: Job filtering by designation**
  - **Validates: Requirements 2.3**

- [ ]* 7.3 Write unit test for empty job results
  - Test that appropriate message displays when no jobs match filters
  - _Requirements: 2.5_

- [ ] 8. Implement job detail view and template
  - Create job_detail_view to display single job
  - Convert job-detail.html to Django template
  - Display all job fields including salary, qualifications, requirements
  - _Requirements: 2.4_

- [ ]* 8.1 Write property test for job detail completeness
  - **Property 4: Job detail completeness**
  - **Validates: Requirements 2.4**

- [ ] 9. Implement job application view and template
  - Create job_apply_view with form handling
  - Handle POST requests with form validation
  - Display success messages using Django messages framework
  - Convert job-apply.html to use {{ form }} rendering
  - Handle file uploads for CV field
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 9.1 Write property test for form validation
  - **Property 5: Form validation for required fields**
  - **Validates: Requirements 3.1, 3.5**

- [ ]* 9.2 Write property test for application creation
  - **Property 6: Application creation on valid submission**
  - **Validates: Requirements 3.2**

- [ ]* 9.3 Write property test for file upload paths
  - **Property 7: File upload path correctness**
  - **Validates: Requirements 3.3**

- [ ]* 9.4 Write unit test for success message
  - Test that confirmation message appears after successful submission
  - _Requirements: 3.4_

- [ ] 10. Implement finance view and template
  - Create finance_view to query financial data
  - Query FinancialMetrics, FiscalYear, PortfolioStatus, FinanceProject
  - Convert finance.html to Django template
  - Use model formatting methods for currency display
  - Group projects by fiscal year
  - Display portfolio percentage breakdowns
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 10.1 Write property test for fiscal year ordering
  - **Property 11: Fiscal year ordering**
  - **Validates: Requirements 5.2**

- [ ]* 10.2 Write property test for project grouping
  - **Property 12: Project grouping by fiscal year**
  - **Validates: Requirements 5.3**

- [ ]* 10.3 Write property test for portfolio percentage calculation
  - **Property 13: Portfolio percentage calculation accuracy**
  - **Validates: Requirements 5.4**

- [ ]* 10.4 Write property test for financial value formatting
  - **Property 14: Financial value formatting**
  - **Validates: Requirements 5.5**

- [ ] 11. Implement social welfare view and template
  - Create social_welfare_view to query stories
  - Convert socialwalfare.html to Django template
  - Display stories in order with conditional link rendering
  - _Requirements: 7.1, 7.2, 7.3_

- [ ]* 11.1 Write property test for story ordering
  - **Property 18: Story ordering consistency**
  - **Validates: Requirements 7.2**

- [ ]* 11.2 Write property test for story link rendering
  - **Property 19: Story link conditional rendering**
  - **Validates: Requirements 7.3**

- [ ] 12. Implement media gallery view and template
  - Create view to display MediaMosaicItem records
  - Add category filtering functionality
  - Convert template to handle both image and video types
  - Render thumbnails for videos, direct images for images
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ]* 12.1 Write property test for media category filtering
  - **Property 15: Media category filtering**
  - **Validates: Requirements 6.2**

- [ ]* 12.2 Write property test for video thumbnail rendering
  - **Property 16: Video thumbnail rendering**
  - **Validates: Requirements 6.3**

- [ ]* 12.3 Write property test for image rendering
  - **Property 17: Image direct rendering**
  - **Validates: Requirements 6.4**

- [ ] 13. Implement testimonials rendering
  - Add testimonials to relevant page views
  - Create template partial for testimonial display
  - Include all fields: name, role, review, rating
  - Handle image and attachment URLs correctly
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ]* 13.1 Write property test for testimonial field completeness
  - **Property 8: Testimonial field completeness**
  - **Validates: Requirements 4.2**

- [ ]* 13.2 Write property test for media URL formatting
  - **Property 9: Media URL formatting for images**
  - **Validates: Requirements 4.3**

- [ ]* 13.3 Write property test for attachment links
  - **Property 10: Attachment link presence**
  - **Validates: Requirements 4.4**

- [ ] 14. Implement chatbot API endpoint
  - Create chatbot_api_view with POST handling
  - Integrate existing get_gemini_response utility
  - Retrieve active ChatBotConfig
  - Handle API errors gracefully
  - Return JSON responses
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ]* 14.1 Write property test for chatbot config retrieval
  - **Property 20: Active chatbot config retrieval**
  - **Validates: Requirements 8.1**

- [ ]* 14.2 Write property test for chatbot context inclusion
  - **Property 21: Chatbot context inclusion**
  - **Validates: Requirements 8.2**

- [ ]* 14.3 Write property test for chatbot response passthrough
  - **Property 22: Chatbot response passthrough**
  - **Validates: Requirements 8.3**

- [ ]* 14.4 Write unit test for missing API key
  - Test that appropriate error message is returned when API key is missing
  - _Requirements: 8.4_

- [ ]* 14.5 Write property test for chatbot error handling
  - **Property 23: Chatbot error handling**
  - **Validates: Requirements 8.5**

- [ ] 15. Implement remaining static page views
  - Create views for: about, services, team, blog, contact, project
  - Convert corresponding HTML templates
  - Add any necessary model queries for dynamic content
  - _Requirements: 1.3, 1.4_

- [ ]* 15.1 Write unit tests for static page views
  - Test that all pages return 200 status
  - Test correct templates are used
  - _Requirements: 1.3_

- [ ] 16. Configure media file serving
  - Set up media URL patterns in urls.py
  - Test media file uploads through admin
  - Verify media files are accessible in templates
  - _Requirements: 1.5, 9.3_

- [ ]* 16.1 Write unit test for media file serving
  - Test that uploaded media files are accessible
  - _Requirements: 1.5_

- [ ] 17. Final integration and testing
  - Run all tests to ensure everything passes
  - Test complete user workflows manually
  - Verify UI/UX matches original static site
  - Check all links and navigation work correctly
  - Ensure all tests pass, ask the user if questions arise
  - _Requirements: All_
