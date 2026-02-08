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


@admin.register(FinancialMetrics)
class FinancialMetricsAdmin(admin.ModelAdmin):
    list_display = ('total_budget', 'total_expenditure', 'total_projects', 'is_active', 'updated_at')
    list_filter = ('is_active',)


class FinanceProjectInline(admin.TabularInline):
    model = FinanceProject
    extra = 0


@admin.register(FiscalYear)
class FiscalYearAdmin(admin.ModelAdmin):
    list_display = ('year', 'start_date', 'end_date', 'is_active', 'order')
    list_filter = ('is_active',)
    list_editable = ('order', 'is_active')
    inlines = (FinanceProjectInline,)
    ordering = ('order', '-year')


@admin.register(PortfolioStatus)
class PortfolioStatusAdmin(admin.ModelAdmin):
    list_display = ('completed_count', 'ongoing_count', 'priority_count', 'is_active', 'updated_at')
    list_filter = ('is_active',)


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
