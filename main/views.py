import json
import math
from django.core.paginator import Paginator
from django.db.models import Q
from django.contrib import messages
from django.core.serializers.json import DjangoJSONEncoder
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils.decorators import method_decorator
from django.utils.text import Truncator, slugify
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from .models import (
    ChatBotConfig,
    CompanyStatistic,
    FinancialMetrics,
    FinanceProject,
    FiscalYear,
    HomeSlider,
    BlogPost,
    JobApplication,
    JobVacancy,
    MediaMosaicItem,
    Partner,
    PortfolioStatus,
    Project,
    SocialWelfareStory,
    Testimonial,
)
from .chatbot import get_gemini_response


def safe_model_query(model, **filters):
    """Return a safe queryset for a model, falling back to none() on error."""
    try:
        return model.objects.filter(**filters)
    except Exception:
        return model.objects.none()


class BaseDynamicView(View):
    """Base class for views that build context dynamically."""
    template_name = None

    def get_dynamic_context(self):
        return {}

    def get_fallback_context(self):
        return {}

    def get(self, request, *args, **kwargs):
        try:
            context = self.get_dynamic_context()
        except Exception:
            context = self.get_fallback_context()
        return render(request, self.template_name, context)


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


def home_view(request):
    sliders = HomeSlider.objects.filter(is_active=True)
    statistics = CompanyStatistic.objects.all()
    stats = []
    for stat in statistics:
        value = str(stat.value).strip()
        suffix = '%' if value.endswith('%') else '+'
        stats.append(
            {
                'label': stat.label,
                'value': value.rstrip('%'),
                'suffix': suffix,
            }
        )

    context = {
        'sliders': sliders,
        'stats': stats,
        'partners': Partner.objects.all(),
        'testimonials': Testimonial.objects.all(),
        'chat_config': ChatBotConfig.objects.filter(is_active=True).first(),
    }
    return render(request, 'index.html', context)


def about_view(request):
    return render(request, 'about.html')


def services_view(request):
    return render(request, 'services.html')


def team_view(request):
    return render(request, 'ourteam.html')


def blog_view(request):
    posts_qs = BlogPost.objects.all().order_by('-date')
    blog_posts_json = []
    for post in posts_qs:
        words_count = len(post.content.split())
        reading_time = max(1, math.ceil(words_count / 200))
        blog_posts_json.append(
            {
                'id': str(post.id),
                'slug': slugify(post.title),
                'title': post.title,
                'description': Truncator(post.content).words(35, truncate='...'),
                'fullContent': post.content,
                'category': post.category,
                'date': post.date.isoformat(),
                'readingTime': reading_time,
                'author': post.author,
                'thumbnail': post.image.url if post.image else '',
                'mediaType': 'image',
                'media': [],
            }
        )

    context = {
        'blog_posts_json': json.dumps(blog_posts_json),
    }
    return render(request, 'blog.html', context)


def contact_view(request):
    return render(request, 'contact.html')


def project_view(request):
    projects_qs = Project.objects.all().order_by('-year', 'title')
    category_labels = dict(Project.CATEGORY_CHOICES)
    projects_json = []
    for project in projects_qs:
        media = []
        if project.image:
            media.append(
                {
                    'id': f"{project.id}-img",
                    'type': 'image',
                    'src': project.image.url,
                    'alt': project.title,
                    'aspectRatio': 1.33,
                }
            )
        if project.video:
            media.append(
                {
                    'id': f"{project.id}-vid",
                    'type': 'video',
                    'src': project.video.url,
                    'thumbnail': project.image.url if project.image else '',
                    'alt': project.title,
                    'aspectRatio': 1.78,
                }
            )

        projects_json.append(
            {
                'id': str(project.id),
                'title': project.title,
                'location': project.location,
                'year': project.year,
                'category': project.category,
                'categoryLabel': category_labels.get(project.category, project.category),
                'featured': project.is_featured,
                'media': media,
            }
        )

    context = {
        'media_items': MediaMosaicItem.objects.filter(is_active=True),
        'projects_json': projects_json,
        'project_categories_json': (
            [{'id': 'all', 'label': 'All'}]
            + [
                {'id': key, 'label': label}
                for key, label in Project.CATEGORY_CHOICES
            ]
        ),
    }
    return render(request, 'project.html', context)


class FinanceView(BaseDynamicView):
    template_name = "finance.html"

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


def social_welfare_view(request):
    media_items = MediaMosaicItem.objects.filter(is_active=True).order_by("order")
    story_items = SocialWelfareStory.objects.filter(is_active=True).order_by("order", "-created_at")
    
    media_items_json = json.dumps([
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

    context = {
        'media_items_json': media_items_json,
        'story_items': json.dumps([
            {
                'id': str(story.id),
                'title': story.title,
                'summary': story.description,
                'image': story.image.url if story.image else '',
                'link': story.link,
            }
            for story in story_items
        ]),
        "categories":  (
            media_items.values_list("category", flat=True)
            .distinct()
        )
    }
    return render(request, 'socialwalfare.html', context)


def agriculture_view(request):
    return render(request, 'Agriculture.html')


def coming_soon_view(request):
    return render(request, 'coming-soon.html')


def login_view(request):
    return render(request, 'login.html')


def signup_view(request):
    return render(request, 'signup.html')


def candidates_view(request):
    return render(request, 'candidates.html')


def job_post_view(request):
    return render(request, 'job-post.html')


def job_list_view(request):
    jobs_qs = JobVacancy.objects.filter(is_active=True)

    search_term = request.GET.get('s', '').strip()
    job_type = request.GET.get('job_type', '').strip()
    location = request.GET.get('location', '').strip()

    if search_term:
        jobs_qs = jobs_qs.filter(
            Q(title__icontains=search_term)
            | Q(description__icontains=search_term)
            | Q(requirements__icontains=search_term)
            | Q(qualifications__icontains=search_term)
            | Q(location__icontains=search_term)
            | Q(industry__icontains=search_term)
        )

    if job_type:
        jobs_qs = jobs_qs.filter(job_type=job_type)

    if location:
        jobs_qs = jobs_qs.filter(location=location)

    paginator = Paginator(jobs_qs, 6)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    params = request.GET.copy()
    if 'page' in params:
        del params['page']
    querystring = params.urlencode()

    context = {
        'jobs': page_obj.object_list,
        'page_obj': page_obj,
        'paginator': paginator,
        'querystring': querystring,
        'job_types': JobVacancy.JOB_TYPE_CHOICES,
        'locations': JobVacancy.objects.filter(is_active=True)
            .exclude(location__exact='')
            .values_list('location', flat=True)
            .distinct()
            .order_by('location'),
    }
    return render(request, 'job-list.html', context)


def job_detail_view(request, job_id):
    job = get_object_or_404(JobVacancy, pk=job_id, is_active=True)
    requirements_list = [line.strip() for line in job.requirements.splitlines() if line.strip()]
    qualifications_list = [line.strip() for line in job.qualifications.splitlines() if line.strip()]
    context = {
        'job': job,
        'requirements_list': requirements_list,
        'qualifications_list': qualifications_list,
    }
    return render(request, 'job-detail.html', context)


def job_apply_view(request, job_id):
    job = get_object_or_404(JobVacancy, pk=job_id, is_active=True)
    if request.method == 'POST':
        full_name = request.POST.get('full_name', '').strip()
        email = request.POST.get('email', '').strip()
        phone = request.POST.get('phone', '').strip()
        cover_letter = request.POST.get('cover_letter', '').strip()
        cv = request.FILES.get('cv')

        if not full_name or not email or not phone or not cv:
            messages.error(request, 'Please fill out all required fields and upload your CV.')
        else:
            JobApplication.objects.create(
                job_title=job.title,
                full_name=full_name,
                email=email,
                phone=phone,
                cv=cv,
                cover_letter=cover_letter,
            )
            messages.success(request, 'Your application was submitted successfully.')
            return redirect('job_apply', job_id=job.id)

    return render(request, 'job-apply.html', {'job': job})


def not_found_view(request, exception):
    return render(request, '404.html', status=404)

