import json
from django.contrib import messages
from django.shortcuts import get_object_or_404, redirect, render
from django.core.serializers.json import DjangoJSONEncoder

from .models import (
    ChatBotConfig,
    CompanyStatistic,
    FinancialMetrics,
    FinanceProject,
    FiscalYear,
    HomeSlider,
    JobApplication,
    JobVacancy,
    MediaMosaicItem,
    Partner,
    PortfolioStatus,
    SocialWelfareStory,
    Testimonial,
)


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
    return render(request, 'blog.html')


def contact_view(request):
    return render(request, 'contact.html')


def project_view(request):
    context = {
        'media_items': MediaMosaicItem.objects.filter(is_active=True),
    }
    return render(request, 'project.html', context)


def finance_view(request):
    fiscal_years = list(
        FiscalYear.objects.filter(is_active=True).prefetch_related('projects')
    )
    year_totals = []
    for fy in fiscal_years:
        total_budget = sum((p.budget for p in fy.projects.all()), 0)
        year_totals.append(
            {
                'year': fy.year,
                'value': int(total_budget) if total_budget else 0,
                'formatted': f"{total_budget:,.0f} ETB" if total_budget else "0 ETB",
            }
        )
    if year_totals:
        year_totals[-1]['is_latest'] = True

    turnover_range = ''
    base_year = ''
    base_value = ''
    if year_totals:
        turnover_range = f"FY {year_totals[0]['year']}–{year_totals[-1]['year']}"
        base_year = year_totals[0]['year']
        base_value = year_totals[0]['formatted']

    financial_metrics = FinancialMetrics.objects.filter(is_active=True).first()
    portfolio_status = PortfolioStatus.objects.filter(is_active=True).first()

    completed_pct = portfolio_status.get_completed_percentage() if portfolio_status else 0
    ongoing_pct = portfolio_status.get_ongoing_percentage() if portfolio_status else 0
    priority_pct = portfolio_status.get_priority_percentage() if portfolio_status else 0

    total_budget_value = float(financial_metrics.total_budget) if financial_metrics else 0
    completed_value = total_budget_value * (completed_pct / 100) if total_budget_value else 0
    ongoing_value = total_budget_value * (ongoing_pct / 100) if total_budget_value else 0
    priority_value = total_budget_value * (priority_pct / 100) if total_budget_value else 0

    outstanding_projects = []
    for project in FinanceProject.objects.filter(is_outstanding=True).order_by('-created_at')[:5]:
        progress = 0
        if project.budget and project.expenditure:
            progress = min(100, round((project.expenditure / project.budget) * 100))
        outstanding_projects.append(
            {
                'name': project.name,
                'budget': project.budget,
                'budget_formatted': f"{project.budget:,.0f} ETB" if project.budget else "0 ETB",
                'progress': progress,
            }
        )

    context = {
        'financial_metrics': financial_metrics,
        'fiscal_years': fiscal_years,
        'year_totals': year_totals,
        'turnover_range': turnover_range,
        'base_year': base_year,
        'base_value': base_value,
        'portfolio_status': portfolio_status,
        'completed_pct': completed_pct,
        'ongoing_pct': ongoing_pct,
        'priority_pct': priority_pct,
        'completed_value': completed_value,
        'ongoing_value': ongoing_value,
        'priority_value': priority_value,
        'outstanding_projects': outstanding_projects,
    }
    return render(request, 'finance.html', context)


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
        'story_items': [
            {
                'id': str(story.id),
                'title': story.title,
                'summary': story.description,
                'image': story.image.url if story.image else '',
                'link': story.link,
            }
            for story in story_items
        ],
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
    context = {
        'jobs': JobVacancy.objects.filter(is_active=True),
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
