from django.db import models

# Create your models here.

class HomeSlider(models.Model):
    title = models.CharField(max_length=200)
    tagline = models.CharField(max_length=200)
    video = models.FileField(upload_to='slider/videos/', blank=True, null=True)
    image = models.ImageField(upload_to='slider/images/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=100, help_text="Font Awesome class, e.g., 'icon-engineer'")
    image = models.ImageField(upload_to='services/')
    badge = models.CharField(max_length=50, blank=True, help_text="e.g., 'Core Service', 'Local Works'")
    tags = models.CharField(max_length=200, blank=True, help_text="Comma-separated tags, e.g., 'commercial, institutional'")
    
    def __str__(self):
        return self.title
    
    def get_tags_list(self):
        """Return tags as a list of strings."""
        if self.tags:
            return [tag.strip() for tag in self.tags.split(',')]
        return []

class AboutTeam(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    image = models.ImageField(upload_to='team/')
    bio = models.TextField(blank=True)
    facebook = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Testimonial(models.Model):
    client_name = models.CharField(max_length=200)
    client_role = models.CharField(max_length=200)
    review = models.TextField()
    rating = models.IntegerField(default=5)
    image = models.ImageField(upload_to='testimonials/')
    attachment = models.FileField(upload_to='testimonials/attachments/', blank=True, null=True)

    def __str__(self):
        return self.client_name

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('road', 'Road Construction'),
        ('building', 'Building Works'),
        ('water', 'Water Supply & Sewerage'),
        ('corridor', 'Corridor Development'),
        ('other', 'Other'),
    ]
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    location = models.CharField(max_length=200)
    year = models.IntegerField()
    image = models.ImageField(upload_to='projects/')
    video = models.FileField(upload_to='projects/videos/', blank=True, null=True)
    description = models.TextField()
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='blog/')
    category = models.CharField(max_length=100)
    date = models.DateField()
    author = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class JobVacancy(models.Model):
    TYPE_CHOICES = [
        ('Permanent', 'Permanent'),
        ('Temporary', 'Temporary'),
        ('Contract', 'Contract'),
        ('On-site', 'On-site'),
        ('Shift Work', 'Shift Work'),
    ]
    title = models.CharField(max_length=200)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    location = models.CharField(max_length=200)
    salary_range = models.CharField(max_length=100)
    posted_date = models.DateField(auto_now_add=True)
    description = models.TextField()

    def __str__(self):
        return self.title

class ChatbotDocument(models.Model):
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='documents/')
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

class Partner(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='partners/')
    website = models.URLField(blank=True)

    def __str__(self):
        return self.name

class VideoGalleryItem(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='video_gallery/thumbnails/')
    video_url = models.URLField(help_text="YouTube link or similar")

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    JOB_TYPE_CHOICES = [
        ('All Jobs', 'All Jobs'),
        ('Full Time', 'Full Time'),
        ('Half Time', 'Half Time'),
        ('Remote', 'Remote'),
        ('In Office', 'In Office'),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    job_title = models.CharField(max_length=200, blank=True, null=True)
    job_type = models.CharField(max_length=50, choices=JOB_TYPE_CHOICES, default='All Jobs')
    description = models.TextField(blank=True, null=True)
    cv = models.FileField(upload_to='cvs/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.job_title}"

class CompanyStatistic(models.Model):
    title = models.CharField(max_length=100, help_text="e.g., 'Project Complete'")
    value = models.CharField(max_length=50, help_text="e.g., '13'")
    suffix = models.CharField(max_length=10, blank=True, help_text="e.g., '+', '%'")
    icon_class = models.CharField(max_length=100, blank=True, help_text="e.g., 'icon-scaffolding'")
    order = models.IntegerField(default=0, help_text="Order to display on the page")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class ChatBotConfig(models.Model):
    context = models.TextField(help_text="The system instructions/context for the AI chatbot.")
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Chatbot Configuration"
        verbose_name_plural = "Chatbot Configuration"

    def __str__(self):
        return "Chatbot Configuration"

    def save(self, *args, **kwargs):
        if self.is_active:
            # Ensure only one config is active
            ChatBotConfig.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)
