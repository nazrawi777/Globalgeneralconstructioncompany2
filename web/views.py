from django.shortcuts import render
from django.views.generic import TemplateView, View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.db import DatabaseError, models
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging
from .chatbot import get_gemini_response
from .models import (
    HomeSlider,
    JobApplication,
    MediaMosaicItem,
    Service,
    AboutTeam,
    Testimonial,
    Project,
    BlogPost,
    JobVacancy,
    Partner,
    CompanyStatistic,
    ChatBotConfig,
    FiscalYear,
    FinanceProject,
    FinancialMetrics,
    PortfolioStatus,
    SocialWelfareStory,
)
from django.views.generic import ListView
from django.db.models import Q

logger = logging.getLogger(__name__)


def safe_model_query(model_class, **filters):
    """Safely query models with error handling"""
    try:
        return model_class.objects.filter(**filters)
    except DatabaseError as e:
        logger.error(f"Database error in {model_class.__name__}: {e}")
        return model_class.objects.none()
    except Exception as e:
        logger.error(f"Unexpected error in {model_class.__name__}: {e}")
        return model_class.objects.none()


class BaseDynamicView(TemplateView):
    """Base class for all dynamic content views with error handling"""

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            context.update(self.get_dynamic_context())
        except Exception as e:
            logger.error(
                f"Error getting dynamic context for {self.__class__.__name__}: {e}"
            )
            context.update(self.get_fallback_context())
        return context

    def get_dynamic_context(self):
        """Override in subclasses to provide specific context"""
        return {}

    def get_fallback_context(self):
        """Provide fallback context when dynamic context fails"""
        return {}


class IndexView(BaseDynamicView):
    template_name = "web/index.html"

    def get_dynamic_context(self):
        """Provide homepage-specific context data"""
        context = {}

        # Get active HomeSlider entries
        context["home_sliders"] = safe_model_query(HomeSlider, is_active=True)

        # Get Service entries for homepage display
        context["services"] = safe_model_query(Service)

        # Get CompanyStatistic entries ordered by sequence
        context["company_statistics"] = safe_model_query(CompanyStatistic).order_by(
            "order"
        )

        # Get Testimonial entries
        context["testimonials"] = safe_model_query(Testimonial)

        return context

    def get_fallback_context(self):
        """Provide fallback context when dynamic context fails"""
        return {
            "home_sliders": HomeSlider.objects.none(),
            "services": Service.objects.none(),
            "company_statistics": CompanyStatistic.objects.none(),
            "testimonials": Testimonial.objects.none(),
        }


class AboutView(BaseDynamicView):
    template_name = "web/about.html"
    

    def get_dynamic_context(self):
        context = {}
        # Get the first AboutTeam entry for the About page
        about_team_entry = safe_model_query(AboutTeam).first()
                # Get Testimonial entries
        context["testimonials"] = safe_model_query(Testimonial)
        context["about_team_entry"] = about_team_entry
        return context

    def get_fallback_context(self):
        return {
            "about_team_entry": None,
            
        }


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

""" 
class JobApplyView(BaseDynamicView):
    template_name = "web/job-apply.html"

    def get_dynamic_context(self):
        context = {}
        job_id = self.request.GET.get("job_id")
        if job_id:
            try:
                job = JobVacancy.objects.get(pk=job_id)
                context["selected_job"] = job
            except JobVacancy.DoesNotExist:
                pass

        # Provide job choices for the form
        context["job_vacancies"] = safe_model_query(JobVacancy)
        context["job_types"] = JobVacancy.JOB_TYPE_CHOICES
        return context

    def post(self, request, *args, **kwargs):
        try:
            name = request.POST.get("name")
            email = request.POST.get("email")
            phone = request.POST.get("phone")
            job_title = request.POST.get("job_title")
            job_type = request.POST.get("job_type", "All Jobs")
            description = request.POST.get("description")
            cv = request.FILES.get("cv")
            accepted_terms = request.POST.get("accepted_terms") == "on"

            if not all([name, email, phone, cv]):
                return JsonResponse({"error": "Missing required fields"}, status=400)

            application = JobApplication.objects.create(
                name=name,
                email=email,
                phone=phone,
                job_title=job_title,
                job_type=job_type,
                description=description,
                cv=cv,
                accepted_terms=accepted_terms,
            )

            return JsonResponse(
                {
                    "success": True,
                    "message": "Application submitted successfully",
                    "application_id": application.id,
                }
            )
        except Exception as e:
            logger.error(f"Error saving job application: {e}")
            return JsonResponse({"error": "Internal server error"}, status=500)

 """

class JobApplyView(View):
    template_name = "web/job-apply.html"

    def get(self, request, *args, **kwargs):
        job_id = request.GET.get("job_id")
        selected_job = None
        if job_id:
            selected_job = JobVacancy.objects.filter(pk=job_id).first()

        context = {
            "selected_job": selected_job,
            "job_vacancies": JobVacancy.objects.all(),
            "job_types": JobVacancy.JOB_TYPE_CHOICES,
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        try:
            name = request.POST.get("name")
            email = request.POST.get("email")
            phone = request.POST.get("phone")
            job_title = request.POST.get("job_title")
            job_type = request.POST.get("job_type", "All Jobs")
            description = request.POST.get("description")
            cv = request.FILES.get("cv")
            accepted_terms = request.POST.get("accepted_terms") == "on"

            # Validation
            if not all([name, email, phone, job_title, cv]):
                return JsonResponse({"success": False, "message": "Please fill all required fields."})

            # Save application
            application = JobApplication.objects.create(
                name=name,
                email=email,
                phone=phone,
                job_title=job_title,
                job_type=job_type,
                description=description,
                cv=cv,
                accepted_terms=accepted_terms,
            )

            return JsonResponse({
                "success": True,
                "message": f"Thank you {name}! Your application for '{job_title}' has been submitted successfully.",
                "application_id": application.id,
            })

        except Exception as e:
            logger.error(f"Error saving job application: {e}")
            return JsonResponse({
                "success": False,
                "message": "An unexpected error occurred. Please try again later."
            })
class JobDetailView(BaseDynamicView):
    template_name = "web/job-detail.html"

    def get_dynamic_context(self):
        context = {}
        job_id = self.kwargs.get("pk")
        if job_id:
            try:
                job = JobVacancy.objects.get(pk=job_id)
                context["job_vacancy"] = job
            except JobVacancy.DoesNotExist:
                logger.warning(f"JobVacancy with id {job_id} not found")
                context["job_vacancy"] = None
        return context

    def get_fallback_context(self):
        return {
            "job_vacancy": None,
        }

""" 
class JobListView(BaseDynamicView):
    template_name = "web/job-list.html"

    def get_dynamic_context(self):
        context = {}
        # Get job vacancies with optional filtering
        search_query = self.request.GET.get("s", "")
        job_type = self.request.GET.get("job_type", "")
        location = self.request.GET.get("location", "")

        vacancies = safe_model_query(JobVacancy)

        if search_query:
            vacancies = vacancies.filter(
                models.Q(title__icontains=search_query)
                | models.Q(description__icontains=search_query)
                | models.Q(skills__icontains=search_query)
            )

        if job_type:
            vacancies = vacancies.filter(job_type=job_type)

        if location:
            vacancies = vacancies.filter(address__icontains=location)

        context["job_vacancies"] = vacancies.order_by("-posted_date")

        # Provide choices for filtering UI
        context["job_types"] = JobVacancy.JOB_TYPE_CHOICES
        context["locations"] = list(
            JobVacancy.objects.values_list("address", flat=True).distinct()
        )

        return context

    def get_fallback_context(self):
        return {
            "job_vacancies": JobVacancy.objects.none(),
            "job_types": JobVacancy.JOB_TYPE_CHOICES,
            "locations": [],
        }

 """


class JobListView(ListView):
    template_name = "web/job-list.html"
    context_object_name = "job_vacancies"
    paginate_by = 10

    def get_queryset(self):
        qs = JobVacancy.objects.all().order_by("-posted_date")

        s = self.request.GET.get("s")
        job_type = self.request.GET.get("job_type")
        location = self.request.GET.get("location")

        if s:
            qs = qs.filter(
                Q(title__icontains=s) |
                Q(description__icontains=s) |
                Q(skills__icontains=s)
            )

        if job_type:
            qs = qs.filter(job_type=job_type)

        if location:
            qs = qs.filter(address__icontains=location)

        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["job_types"] = JobVacancy.JOB_TYPE_CHOICES
        context["locations"] = (
            JobVacancy.objects.values_list("address", flat=True).distinct()
        )
        return context


class JobListView(ListView):
    template_name = "web/job-list.html"
    context_object_name = "job_vacancies"
    paginate_by = 10

    def get_queryset(self):
        qs = JobVacancy.objects.all().order_by("-posted_date")

        s = self.request.GET.get("s")
        job_type = self.request.GET.get("job_type")
        location = self.request.GET.get("location")

        if s:
            qs = qs.filter(
                Q(title__icontains=s) |
                Q(description__icontains=s) |
                Q(skills__icontains=s)
            )

        if job_type:
            qs = qs.filter(job_type=job_type)

        if location:
            qs = qs.filter(address__icontains=location)

        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["job_types"] = JobVacancy.JOB_TYPE_CHOICES
        context["locations"] = (
            JobVacancy.objects.values_list("address", flat=True).distinct()
        )
        return context

class JobPostView(TemplateView):
    template_name = "web/job-post.html"


class LoginView(TemplateView):
    template_name = "web/login.html"


class OurTeamView(BaseDynamicView):
    template_name = "web/ourteam.html"

    def get_dynamic_context(self):
        context = {}
        # Get all AboutTeam entries for the Our Team page
        team_members = safe_model_query(AboutTeam)
        context["team_members"] = team_members
        return context

    def get_fallback_context(self):
        return {
            "team_members": AboutTeam.objects.none(),
        }


class ProjectView(BaseDynamicView):
    template_name = "web/project.html"

    def get_dynamic_context(self):
        """Provide projects-specific context data"""
        context = {}

        # Get category filter from request
        category_filter = self.request.GET.get("category", "all")

        # Get Project entries with filtering by category
        if category_filter == "all" or not category_filter:
            projects = safe_model_query(Project).order_by("-year", "title")
        else:
            projects = safe_model_query(Project, category=category_filter).order_by(
                "-year", "title"
            )

        context["projects"] = projects
        context["selected_category"] = category_filter

        # Get featured projects for highlighting
        featured_projects = safe_model_query(Project, is_featured=True).order_by(
            "-year", "title"
        )
        context["featured_projects"] = featured_projects

        # Get unique categories for filtering with counts
        categories = []
        all_projects = safe_model_query(Project)
        total_count = all_projects.count()

        # Add "All" category
        categories.append({"id": "all", "label": "All Projects", "count": total_count})

        # Add specific categories with counts
        for category_id, category_label in Project.CATEGORY_CHOICES:
            category_count = all_projects.filter(category=category_id).count()
            if category_count > 0:  # Only include categories that have projects
                categories.append(
                    {
                        "id": category_id,
                        "label": category_label,
                        "count": category_count,
                    }
                )

        context["project_categories"] = categories

        # Handle project media content - prepare media data for JavaScript
        projects_with_media = []
        for project in projects:
            project_data = {
                "id": project.id,
                "title": project.title,
                "subtitle": project.subtitle,
                "location": project.location,
                "year": project.year,
                "category": project.category,
                "category_label": dict(Project.CATEGORY_CHOICES).get(
                    project.category, project.category
                ),
                "description": project.description,
                "is_featured": project.is_featured,
                "media": [],
            }

            # Add image media
            if project.image:
                project_data["media"].append(
                    {
                        "type": "image",
                        "src": project.image.url,
                        "alt": f"{project.title} - {project.location}",
                        "aspect_ratio": 1.33,  # Default aspect ratio
                    }
                )

            # Add video media if available
            if project.video:
                project_data["media"].append(
                    {
                        "type": "video",
                        "src": project.video.url,
                        "thumbnail": project.image.url if project.image else "",
                        "alt": f"{project.title} - Video",
                        "aspect_ratio": 1.78,  # Video aspect ratio
                    }
                )

            projects_with_media.append(project_data)

        context["projects_json"] = projects_with_media


class ServicesView(BaseDynamicView):
    template_name = "web/services.html"

    def get_dynamic_context(self):
        """Provide services-specific context data"""
        context = {}

        # Get Service entries with categories and tags
        services = safe_model_query(Service)
        context["services"] = services

        # Get unique tags for filtering
        all_tags = []
        for service in services:
            if service.tags:
                all_tags.extend(service.get_tags_list())
        context["unique_tags"] = list(set(all_tags))

        return context

    def get_fallback_context(self):
        """Provide fallback context when dynamic context fails"""
        return {
            "services": Service.objects.none(),
            "unique_tags": [],
        }


class SignupView(TemplateView):
    template_name = "web/signup.html"


class SocialWelfareView(TemplateView):
    template_name = "web/socialwalfare.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        media_items = MediaMosaicItem.objects.filter(is_active=True).order_by("order")
        #media_items = MediaMosaicItem.objects.filter(is_active=True).order_by("order", "-created_at")

        context['media_items_json'] = json.dumps([
            {
                "id": str(item.id),
                "type": item.type,
                "src": item.src.url if item.type == "image" else "",
                "thumbnail": item.thumbnail.url if item.type == "video" else item.src.url,
                "title": item.title,
                "category": item.category,
                "description": item.description,
            }
            for item in media_items
        ], cls=DjangoJSONEncoder)


        context["media_items"] = media_items
        context["categories"] = (
            media_items.values_list("category", flat=True)
            .distinct()
        )

        return context


class FinanceView(BaseDynamicView):
    template_name = "web/finance.html"

    def get_dynamic_context(self):
        """Provide finance-specific context data"""
        context = {}
        
        # Get fiscal years ordered by display order
        context["fiscal_years"] = safe_model_query(FiscalYear, is_active=True).order_by('order', '-year')
        
        # Get all finance projects
        context["finance_projects"] = safe_model_query(FinanceProject).order_by('fiscal_year__order', 'order', '-value')
        
        # Get outstanding projects (for sidebar)
        context["outstanding_projects"] = safe_model_query(FinanceProject, is_outstanding=True).order_by('-value')
        
        # Get financial metrics (overview stats)
        metrics = safe_model_query(FinancialMetrics, is_active=True).first()
        context["financial_metrics"] = metrics
        
        # Get portfolio status
        portfolio_status = safe_model_query(PortfolioStatus, is_active=True).first()
        context["portfolio_status"] = portfolio_status
        
        # Prepare data for JavaScript
        financial_years_data = []
        for fy in context["fiscal_years"]:
            financial_years_data.append({
                'year': fy.year,
                'turnover': float(fy.turnover),
                'formatted': fy.formatted_turnover(),
            })
        
        projects_data = []
        for project in context["finance_projects"]:
            projects_data.append({
                'id': f'project-{project.id}',
                'title': project.title,
                'description': project.description,
                'value': float(project.value),
                'formattedValue': project.formatted_value(),
                'contractDate': project.contract_date,
                'status': project.status,
                'progress': project.progress,
                'client': project.client,
                'isOutstanding': project.is_outstanding,
                'fiscalYear': project.fiscal_year.year if project.fiscal_year else None,
            })
        
        context["financial_years_json"] = json.dumps(financial_years_data, cls=DjangoJSONEncoder)
        context["projects_json"] = json.dumps(projects_data, cls=DjangoJSONEncoder)
        
        return context

    def get_fallback_context(self):
        """Provide fallback context when dynamic context fails"""
        return {
            "fiscal_years": FiscalYear.objects.none(),
            "finance_projects": FinanceProject.objects.none(),
            "outstanding_projects": FinanceProject.objects.none(),
            "financial_metrics": None,
            "portfolio_status": None,
            "financial_years_json": "[]",
            "projects_json": "[]",
        }


class NotFoundView(TemplateView):
    template_name = "web/404.html"


@method_decorator(csrf_exempt, name="dispatch")
class ChatView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            user_message = data.get("message")
            if not user_message:
                return JsonResponse({"error": "No message provided"}, status=400)

            response_text = get_gemini_response(user_message)
            return JsonResponse({"response": response_text})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
