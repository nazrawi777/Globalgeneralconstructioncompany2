from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path("", TemplateView.as_view(template_name="web/index.html"), name="index"),
    path(
        "index.html",
        TemplateView.as_view(template_name="web/index.html"),
        name="index_html",
    ),
    path("404.html", TemplateView.as_view(template_name="web/404.html"), name="404"),
    path(
        "Agriculture.html",
        TemplateView.as_view(template_name="web/Agriculture.html"),
        name="agriculture",
    ),
    path(
        "about.html", TemplateView.as_view(template_name="web/about.html"), name="about"
    ),
    path("blog.html", TemplateView.as_view(template_name="web/blog.html"), name="blog"),
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
    path(
        "contact.html",
        TemplateView.as_view(template_name="web/contact.html"),
        name="contact",
    ),
    path(
        "job-apply.html",
        TemplateView.as_view(template_name="web/job-apply.html"),
        name="job_apply",
    ),
    path(
        "job-detail.html",
        TemplateView.as_view(template_name="web/job-detail.html"),
        name="job_detail",
    ),
    path(
        "job-list.html",
        TemplateView.as_view(template_name="web/job-list.html"),
        name="job_list",
    ),
    path(
        "job-post.html",
        TemplateView.as_view(template_name="web/job-post.html"),
        name="job_post",
    ),
    path(
        "login.html", TemplateView.as_view(template_name="web/login.html"), name="login"
    ),
    path(
        "ourteam.html",
        TemplateView.as_view(template_name="web/ourteam.html"),
        name="ourteam",
    ),
    path(
        "project.html",
        TemplateView.as_view(template_name="web/project.html"),
        name="project",
    ),
    path(
        "services.html",
        TemplateView.as_view(template_name="web/services.html"),
        name="services",
    ),
    path(
        "signup.html",
        TemplateView.as_view(template_name="web/signup.html"),
        name="signup",
    ),
    path(
        "teams.html", TemplateView.as_view(template_name="web/teams.html"), name="teams"
    ),
    path(
        "testimonials.html",
        TemplateView.as_view(template_name="web/testimonials.html"),
        name="testimonials",
    ),
]
