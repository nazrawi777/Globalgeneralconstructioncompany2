from django.contrib import admin

from .models import (
    HomeSlider,
    CompanyStatistic,
    Partner,
    Testimonial,
    JobVacancy,
    JobApplication,
    FinancialMetrics,
    FiscalYear,
    FinanceProject,
    Project,
    BlogPost,
    PortfolioStatus,
    MediaMosaicItem,
    SocialWelfareStory,
    ChatBotConfig,
)


@admin.register(HomeSlider)
class HomeSliderAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'created_at', 'updated_at')
    list_filter = ('is_active',)
    search_fields = ('title', 'tagline')
    ordering = ('created_at',)


@admin.register(CompanyStatistic)
class CompanyStatisticAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'order')
    list_editable = ('order',)
    ordering = ('order',)


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'order')
    list_editable = ('order',)
    search_fields = ('name',)
    ordering = ('order',)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'client_role', 'rating', 'created_at')
    list_filter = ('rating',)
    search_fields = ('client_name', 'client_role', 'review')
    ordering = ('-created_at',)


@admin.register(JobVacancy)
class JobVacancyAdmin(admin.ModelAdmin):
    list_display = ('title', 'designation', 'job_type', 'location', 'posted_date', 'is_active')
    list_filter = ('job_type', 'designation', 'is_active')
    search_fields = ('title', 'location', 'industry')
    ordering = ('-posted_date',)


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'job_title', 'email', 'phone', 'applied_date')
    search_fields = ('full_name', 'job_title', 'email')
    ordering = ('-applied_date',)




@admin.register(FiscalYear)
class FiscalYearAdmin(admin.ModelAdmin):
    list_display = ('year', 'turnover', 'formatted_turnover', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('year',)
    list_editable = ('is_active', 'order')
    ordering = ('order', '-year')
    fieldsets = (
        ('Fiscal Year Information', {
            'fields': ('year', 'turnover', 'year_start', 'year_end')
        }),
        ('Display Settings', {
            'fields': ('is_active', 'order')
        }),
    )


@admin.register(FinanceProject)
class FinanceProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'status', 'formatted_value', 'progress', 'is_outstanding', 'fiscal_year', 'order')
    list_editable = ('status', 'progress', 'is_outstanding', 'order', 'formatted_value')
    list_filter = ('status', 'is_outstanding', 'fiscal_year')
    search_fields = ('title', 'client', 'description')
    list_editable = ('status', 'progress', 'is_outstanding', 'order')
    ordering = ('fiscal_year__order', 'order', '-value')
    fieldsets = (
        ('Project Information', {
            'fields': ('title', 'description', 'client', 'contract_date')
        }),
        ('Financial Details', {
            'fields': ('value', 'status', 'progress', 'fiscal_year')
        }),
        ('Display Settings', {
            'fields': ('is_outstanding', 'order')
        }),
    )


@admin.register(FinancialMetrics)
class FinancialMetricsAdmin(admin.ModelAdmin):
    list_display = ('current_turnover_year', 'formatted_turnover', 'total_projects', 'formatted_portfolio_value', 'is_active', 'updated_at')
    list_filter = ('is_active',)
    list_editable = ('is_active',)
    fieldsets = (
        ('Current Fiscal Year', {
            'fields': ('current_turnover_year', 'current_turnover', 'yoy_growth')
        }),
        ('Project Metrics', {
            'fields': ('total_projects', 'completed_projects', 'active_works')
        }),
        ('Portfolio Value', {
            'fields': ('portfolio_value',)
        }),
        ('Display Settings', {
            'fields': ('is_active',)
        }),
    )

    def has_add_permission(self, request):
        # Allow only one active metrics set
        if FinancialMetrics.objects.filter(is_active=True).exists() and not FinancialMetrics.objects.filter(is_active=True, pk=request.resolver_match.kwargs.get('object_id')).exists():
            return super().has_add_permission(request)
        return super().has_add_permission(request)


@admin.register(PortfolioStatus)
class PortfolioStatusAdmin(admin.ModelAdmin):
    list_display = ('snapshot_date', 'completed_count', 'ongoing_count', 'priority_count', 'formatted_total_value', 'is_active', 'updated_at')
    list_filter = ('is_active', 'snapshot_date')
    list_editable = ('is_active',)
    ordering = ('-snapshot_date',)
    fieldsets = (
        ('Snapshot Information', {
            'fields': ('snapshot_date',)
        }),
        ('Completed Projects', {
            'fields': ('completed_count', 'completed_value')
        }),
        ('Ongoing Projects', {
            'fields': ('ongoing_count', 'ongoing_value')
        }),
        ('Priority Projects', {
            'fields': ('priority_count', 'priority_value')
        }),
        ('Total Portfolio', {
            'fields': ('total_value',)
        }),
        ('Display Settings', {
            'fields': ('is_active',)
        }),
    )


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'location', 'year', 'is_featured')
    list_filter = ('category', 'is_featured', 'year')
    search_fields = ('title', 'subtitle', 'location', 'description')
    ordering = ('-year', 'title')


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'author')
    list_filter = ('category', 'date')
    search_fields = ('title', 'content', 'author', 'category')
    ordering = ('-date', 'title')


@admin.register(MediaMosaicItem)
class MediaMosaicItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'category', 'is_active', 'order', 'created_at')
    list_filter = ('type', 'category', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title',)
    ordering = ('order', '-created_at')


@admin.register(SocialWelfareStory)
class SocialWelfareStoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'order', 'created_at')
    list_filter = ('is_active',)
    list_editable = ('order', 'is_active')
    search_fields = ('title',)
    ordering = ('order', '-created_at')


@admin.register(ChatBotConfig)
class ChatBotConfigAdmin(admin.ModelAdmin):
    list_display = ('is_active', 'updated_at')
    list_filter = ('is_active',)
