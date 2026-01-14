from django.urls import path
from django.views.generic import TemplateView
from .views import (
    IndexView,
    AboutView,
    ServiceListView,
    ProjectListView,
    ProjectDetailView,
    BlogListView,
    BlogDetailView,
    JobListView,
    JobDetailView,
    TestimonialListView,
    ContactView,
    TeamListView,
    JobApplyView,
)

urlpatterns = [
    path("", IndexView.as_view(), name="index"),
    path("index.html", IndexView.as_view(), name="index_html"),
    path("404.html", TemplateView.as_view(template_name="web/404.html"), name="404"),
    path(
        "Agriculture.html",
        TemplateView.as_view(template_name="web/Agriculture.html"),
        name="agriculture",
    ),
    path("about.html", AboutView.as_view(), name="about"),
    path("blog.html", BlogListView.as_view(), name="blog"),
    path("blog-details/<int:pk>/", BlogDetailView.as_view(), name="blog_detail"),
    path(
        "candidates.html",
        TemplateView.as_view(template_name="web/candidates.html"),
        name="candidates",
    ),
    path(
        "coming-soon.html",
        TemplateView.as_view(template_name="web/coming-soon.html"),
        name="coming_soon",
    ),
    path("contact.html", ContactView.as_view(), name="contact"),
    path(
        "job-apply.html",
        JobApplyView.as_view(),
        name="job_apply",
    ),
    path("job-detail/<int:pk>/", JobDetailView.as_view(), name="job_detail"),
    path("job-list.html", JobListView.as_view(), name="job_list"),
    path(
        "job-post.html",
        TemplateView.as_view(template_name="web/job-post.html"),
        name="job_post",
    ),
    path(
        "login.html", TemplateView.as_view(template_name="web/login.html"), name="login"
    ),
    path("ourteam.html", TeamListView.as_view(), name="ourteam"),
    path("project.html", ProjectListView.as_view(), name="project"),
    path("projects.html", ProjectListView.as_view(), name="projects"),
    path(
        "project-details/<int:pk>/", ProjectDetailView.as_view(), name="project_detail"
    ),
    path("services.html", ServiceListView.as_view(), name="services"),
    path(
        "signup.html",
        TemplateView.as_view(template_name="web/signup.html"),
        name="signup",
    ),
    path("teams.html", TeamListView.as_view(), name="teams"),
    path("testimonials.html", TestimonialListView.as_view(), name="testimonials"),
]
