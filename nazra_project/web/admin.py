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