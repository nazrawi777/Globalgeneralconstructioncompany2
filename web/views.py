from django.views.generic import TemplateView, ListView, DetailView
from .models import (
    HomeSlider,
    Service,
    AboutTeam,
    Testimonial,
    Project,
    BlogPost,
    JobVacancy,
    Partner,
    VideoGalleryItem,
)


class IndexView(TemplateView):
    template_name = "web/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["sliders"] = HomeSlider.objects.filter(is_active=True).order_by(
            "-created_at"
        )
        context["services"] = Service.objects.all()[:4]  # Featured services
        context["projects"] = Project.objects.filter(is_featured=True)[:4]
        context["testimonials"] = Testimonial.objects.all()
        context["partners"] = Partner.objects.all()
        context["video_gallery"] = VideoGalleryItem.objects.all()
        return context


class AboutView(TemplateView):
    template_name = "web/about.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["team_members"] = AboutTeam.objects.all()
        return context


class ServiceListView(ListView):
    model = Service
    template_name = "web/services.html"
    context_object_name = "services"


class ProjectListView(ListView):
    model = Project
    template_name = "web/project.html"
    context_object_name = "projects"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["category_choices"] = Project.CATEGORY_CHOICES
        return context


class ProjectDetailView(DetailView):
    model = Project
    template_name = "web/project-details.html"
    context_object_name = "project"


class BlogListView(ListView):
    model = BlogPost
    template_name = "web/blog.html"
    context_object_name = "posts"


class BlogDetailView(DetailView):
    model = BlogPost
    template_name = "web/blog-details.html"
    context_object_name = "post"


class JobListView(ListView):
    model = JobVacancy
    template_name = "web/job-list.html"
    context_object_name = "jobs"


class JobDetailView(DetailView):
    model = JobVacancy
    template_name = "web/job-detail.html"
    context_object_name = "job"


class TestimonialListView(ListView):
    model = Testimonial
    template_name = "web/testimonials.html"
    context_object_name = "testimonials"


class ContactView(TemplateView):
    template_name = "web/contact.html"


class TeamListView(ListView):
    model = AboutTeam
    template_name = "web/ourteam.html"
    context_object_name = "team_members"


from django.views.generic.edit import FormView
from django.urls import reverse_lazy
from django.contrib import messages
from .forms import JobApplicationForm


class JobApplyView(FormView):
    template_name = "web/job-apply.html"
    form_class = JobApplicationForm
    success_url = reverse_lazy("job_apply")

    def form_valid(self, form):
        form.save()
        messages.success(
            self.request, "Your application has been submitted successfully!"
        )
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.error(
            self.request,
            "There was an error submitting your application. Please check the form.",
        )
        return super().form_invalid(form)
