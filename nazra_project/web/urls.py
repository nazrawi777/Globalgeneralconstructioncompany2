from django.urls import path
from . import views

app_name = "web"

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("index.html", views.IndexView.as_view(), name="index_html"),
    path("about.html", views.AboutView.as_view(), name="about"),
    path("Agriculture.html", views.AgricultureView.as_view(), name="agriculture"),
    path("blog.html", views.BlogView.as_view(), name="blog"),
    path("candidates.html", views.CandidatesView.as_view(), name="candidates"),
    path("coming-soon.html", views.ComingSoonView.as_view(), name="coming_soon"),
    path("contact.html", views.ContactView.as_view(), name="contact"),
    path("job-apply.html", views.JobApplyView.as_view(), name="job_apply"),
    path("job-detail.html", views.JobDetailView.as_view(), name="job_detail"),
    path("job-list.html", views.JobListView.as_view(), name="job_list"),
    path("job-post.html", views.JobPostView.as_view(), name="job_post"),
    path("login.html", views.LoginView.as_view(), name="login"),
    path("ourteam.html", views.OurTeamView.as_view(), name="ourteam"),
    path("project.html", views.ProjectView.as_view(), name="project"),
    path("services.html", views.ServicesView.as_view(), name="services"),
    path("signup.html", views.SignupView.as_view(), name="signup"),
    path("socialwalfare.html", views.SocialWelfareView.as_view(), name="socialwalfare"),
    path("finance.html", views.FinanceView.as_view(), name="finance"),
    path("404.html", views.NotFoundView.as_view(), name="404"),
]
