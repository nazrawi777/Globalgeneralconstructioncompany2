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
)

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
