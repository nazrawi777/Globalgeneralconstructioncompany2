from django.views.generic import TemplateView


class IndexView(TemplateView):
    template_name = "web/index.html"


class AboutView(TemplateView):
    template_name = "web/about.html"


class AgricultureView(TemplateView):
    template_name = "web/Agriculture.html"


class BlogView(TemplateView):
    template_name = "web/blog.html"


class CandidatesView(TemplateView):
    template_name = "web/candidates.html"


class ComingSoonView(TemplateView):
    template_name = "web/coming-soon.html"


class ContactView(TemplateView):
    template_name = "web/contact.html"


class JobApplyView(TemplateView):
    template_name = "web/job-apply.html"


class JobDetailView(TemplateView):
    template_name = "web/job-detail.html"


class JobListView(TemplateView):
    template_name = "web/job-list.html"


class JobPostView(TemplateView):
    template_name = "web/job-post.html"


class LoginView(TemplateView):
    template_name = "web/login.html"


class OurTeamView(TemplateView):
    template_name = "web/ourteam.html"


class ProjectView(TemplateView):
    template_name = "web/project.html"


class ServicesView(TemplateView):
    template_name = "web/services.html"


class SignupView(TemplateView):
    template_name = "web/signup.html"


class SocialWelfareView(TemplateView):
    template_name = "web/socialwalfare.html"


class FinanceView(TemplateView):
    template_name = "web/finance.html"


class NotFoundView(TemplateView):
    template_name = "web/404.html"
