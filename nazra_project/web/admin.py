from django.contrib import admin
from .models import (
    HomeSlider,
    Service,
    AboutTeam,
    Testimonial,
    Project,
    BlogPost,
    JobVacancy,
    ChatbotDocument,
    Partner,
    VideoGalleryItem,
    JobApplication,
    CompanyStatistic,
    ChatBotConfig,
    MediaMosaicItem,
    FiscalYear,
    FinanceProject,
    FinancialMetrics,
    PortfolioStatus,
    SocialWelfareStory,
)
from django.utils.html import format_html

# Register your models here.
admin.site.register(HomeSlider)
admin.site.register(Service)
admin.site.register(AboutTeam)
admin.site.register(Testimonial)
admin.site.register(Project)
admin.site.register(BlogPost)
admin.site.register(JobVacancy)
admin.site.register(ChatbotDocument)
admin.site.register(Partner)
admin.site.register(VideoGalleryItem)


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "job_title", "job_type", "created_at")
    list_filter = ("job_type", "created_at")
    search_fields = ("name", "email", "job_title")

    


@admin.register(CompanyStatistic)
class CompanyStatisticAdmin(admin.ModelAdmin):
    list_display = ("title", "value", "suffix", "order")
    list_editable = ("value", "order")

@admin.register(ChatBotConfig)
class ChatBotConfigAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'is_active')
    list_editable = ('is_active',)

@admin.register(MediaMosaicItem)
class MediaMosaicItemAdmin(admin.ModelAdmin):
    list_display = (
        "preview",
        "title",
        "type",
        "category",
        "is_active",
        "order",
    )

    list_filter = ("type", "category", "is_active")
    search_fields = ("title", "description", "category")
    ordering = ("order", "-created_at")

    list_editable = ("order", "is_active")
    readonly_fields = ("created_at", "preview")

    fieldsets = (
        ("Media Info", {
            "fields": ("title", "type", "category", "description")
        }),
        ("Media Files", {
            "fields": ("src", "thumbnail", "preview")
        }),
        ("Display", {
            "fields": ("order", "is_active")
        }),
        ("System", {
            "fields": ("created_at",)
        }),
    )

    def preview(self, obj):
        if obj.type == "image" and obj.src:
            return format_html(
                '<img src="{}" style="height:50px;border-radius:6px;" />',
                obj.src.url
            )
        if obj.type == "video" and obj.thumbnail:
            return format_html(
                '<img src="{}" style="height:50px;border-radius:6px;" />',
                obj.thumbnail.url
            )
        return "—"

    preview.short_description = "Preview"


    preview.short_description = "Preview"


@admin.register(SocialWelfareStory)
class SocialWelfareStoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'order', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('title', 'summary')
    list_editable = ('is_active', 'order')
    ordering = ('order', '-created_at')
    fieldsets = (
        ('Story Information', {
            'fields': ('title', 'summary', 'image', 'link')
        }),
        ('Display Settings', {
            'fields': ('is_active', 'order')
        }),
    )


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