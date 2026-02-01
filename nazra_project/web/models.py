from django.db import models
from django.db import models
from django.utils.text import slugify

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
    JOB_TYPE_CHOICES = [
        ('All Jobs', 'All Jobs'),
        ('Full Time', 'Full Time'),
        ('Half Time', 'Half Time'),
        ('Remote', 'Remote'),
        ('In Office', 'In Office'),
    ]
    
    DESIGNATION_CHOICES = [
        ('Web Designer', 'Web Designer'),
        ('Web Developer', 'Web Developer'),
        ('UI / UX Designer', 'UI / UX Designer'),
    ]

    SALARY_TYPE_CHOICES = [
        ('Hourly', 'Hourly'),
        ('Monthly', 'Monthly'),
    ]

    INDUSTRY_CHOICES = [
        ('Banking', 'Banking'),
        ('Biotechnology', 'Biotechnology'),
        ('Aviation', 'Aviation'),
    ]

    COUNTRY_CHOICES = [
        ('USA', 'USA'),
        ('Canada', 'Canada'),
        ('China', 'China'),
    ]

    STATE_CHOICES = [
        ('California', 'California'),
        ('Texas', 'Texas'),
        ('Florida', 'Florida'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    designation = models.CharField(max_length=100, choices=DESIGNATION_CHOICES, default='Web Developer')
    job_type = models.CharField(max_length=50, choices=JOB_TYPE_CHOICES, default='Full Time')
    salary_type = models.CharField(max_length=50, choices=SALARY_TYPE_CHOICES, default='Monthly')
    min_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    max_salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    skills = models.CharField(max_length=200, help_text="e.g., Web Developer")
    qualifications = models.CharField(max_length=200)
    experience = models.CharField(max_length=100)
    industry = models.CharField(max_length=100, choices=INDUSTRY_CHOICES, default='Banking')
    address = models.CharField(max_length=200)
    country = models.CharField(max_length=100, choices=COUNTRY_CHOICES, default='USA')
    state = models.CharField(max_length=100, choices=STATE_CHOICES, default='California')
    posted_date = models.DateField(auto_now_add=True)

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
    accepted_terms = models.BooleanField(default=False)
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

class MediaMosaicItem(models.Model):
    MEDIA_TYPE_CHOICES = (
        ("image", "Image"),
        ("video", "Video"),
    )

    type = models.CharField(
        max_length=20,
        choices=MEDIA_TYPE_CHOICES,
        default="image",
    )

    # Main media file
    src = models.FileField(
        upload_to="media_mosaic/",
        help_text="Upload image or video file"
    )

    # Thumbnail ONLY for videos
    thumbnail = models.ImageField(
        upload_to="media_mosaic/thumbnails/",
        blank=True,
        null=True,
        help_text="Required for videos only"
    )

    title = models.CharField(max_length=200)

    category = models.CharField(
        max_length=100,
        help_text="e.g. education, housing, football-club"
    )

    description = models.TextField(blank=True)

    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Media Mosaic Item"
        verbose_name_plural = "Media Mosaic Items"

    def save(self, *args, **kwargs):
        if self.category:
            self.category = slugify(self.category)
        super().save(*args, **kwargs)

    def clean(self):
        """
        Enforce rules:
        - image → no thumbnail required
        - video → thumbnail REQUIRED
        """
        from django.core.exceptions import ValidationError

        if self.type == "video" and not self.thumbnail:
            raise ValidationError("Thumbnail is required for video items.")

    def __str__(self):
        return f"{self.title} ({self.type})"


class FiscalYear(models.Model):
    """Represents a fiscal year with annual turnover"""
    year = models.CharField(max_length=20, unique=True, help_text="e.g., '2020/21'")
    turnover = models.DecimalField(max_digits=15, decimal_places=2, help_text="Annual turnover in ETB")
    year_start = models.DateField(blank=True, null=True, help_text="Start date of fiscal year")
    year_end = models.DateField(blank=True, null=True, help_text="End date of fiscal year")
    is_active = models.BooleanField(default=True, help_text="Whether this fiscal year is currently active")
    order = models.IntegerField(default=0, help_text="Order for display (lower numbers first)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-year']
        verbose_name = "Fiscal Year"
        verbose_name_plural = "Fiscal Years"

    def __str__(self):
        return f"FY {self.year}"

    def formatted_turnover(self):
        """Return formatted turnover string"""
        return f"{self.turnover:,.0f} ETB"


class FinanceProject(models.Model):
    """Represents a financial project with status and progress"""
    STATUS_CHOICES = [
        ('Completed', 'Completed'),
        ('Ongoing', 'Ongoing'),
        ('Priority', 'Priority'),
    ]

    title = models.CharField(max_length=500)
    description = models.TextField(blank=True, help_text="Project description")
    client = models.CharField(max_length=300, help_text="Client/Administration name")
    value = models.DecimalField(max_digits=15, decimal_places=2, help_text="Project value in ETB")
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Ongoing')
    progress = models.IntegerField(default=0, help_text="Progress percentage (0-100)")
    fiscal_year = models.ForeignKey(FiscalYear, on_delete=models.CASCADE, related_name='projects', null=True, blank=True)
    is_outstanding = models.BooleanField(default=False, help_text="Show in outstanding works section")
    contract_date = models.CharField(max_length=100, blank=True, help_text="e.g., 'Feb 14, 2017 E.C.'")
    order = models.IntegerField(default=0, help_text="Order for display within fiscal year")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['fiscal_year__order', 'order', '-value']
        verbose_name = "Finance Project"
        verbose_name_plural = "Finance Projects"

    def __str__(self):
        return self.title

    def formatted_value(self):
        """Return formatted value string"""
        if self.value >= 1000000000:
            return f"{(self.value / 1000000000):.2f}B ETB"
        elif self.value >= 1000000:
            return f"{(self.value / 1000000):.1f}M ETB"
        else:
            return f"{self.value:,.0f} ETB"


class FinancialMetrics(models.Model):
    """Stores key financial metrics for the overview section"""
    current_turnover = models.DecimalField(max_digits=15, decimal_places=2, help_text="Current fiscal year turnover in ETB")
    current_turnover_year = models.CharField(max_length=20, help_text="e.g., '2024/25'")
    total_projects = models.IntegerField(default=0, help_text="Total number of projects")
    portfolio_value = models.DecimalField(max_digits=15, decimal_places=2, help_text="Total portfolio value in ETB")
    completed_projects = models.IntegerField(default=0, help_text="Number of completed projects")
    active_works = models.IntegerField(default=0, help_text="Number of active/ongoing projects")
    yoy_growth = models.DecimalField(max_digits=10, decimal_places=2, help_text="Year-over-year growth percentage")
    is_active = models.BooleanField(default=True, help_text="Whether this is the active metrics set")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Financial Metrics"
        verbose_name_plural = "Financial Metrics"

    def __str__(self):
        return f"Financial Metrics - {self.current_turnover_year}"

    def save(self, *args, **kwargs):
        if self.is_active:
            # Ensure only one metrics set is active
            FinancialMetrics.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)

    def formatted_turnover(self):
        """Return formatted turnover string"""
        if self.current_turnover >= 1000000000:
            return f"{(self.current_turnover / 1000000000):.2f}B ETB"
        elif self.current_turnover >= 1000000:
            return f"{(self.current_turnover / 1000000):.1f}M ETB"
        else:
            return f"{self.current_turnover:,.0f} ETB"

    def formatted_portfolio_value(self):
        """Return formatted portfolio value string"""
        if self.portfolio_value >= 1000000000:
            return f"{(self.portfolio_value / 1000000000):.2f}B ETB"
        elif self.portfolio_value >= 1000000:
            return f"{(self.portfolio_value / 1000000):.1f}M ETB"
        else:
            return f"{self.portfolio_value:,.0f} ETB"


class PortfolioStatus(models.Model):
    """Stores portfolio status breakdown (Completed, Ongoing, Priority)"""
    snapshot_date = models.DateField(help_text="Date of the portfolio snapshot")
    completed_count = models.IntegerField(default=0)
    completed_value = models.DecimalField(max_digits=15, decimal_places=2, help_text="Total value of completed projects in ETB")
    ongoing_count = models.IntegerField(default=0)
    ongoing_value = models.DecimalField(max_digits=15, decimal_places=2, help_text="Total value of ongoing projects in ETB")
    priority_count = models.IntegerField(default=0)
    priority_value = models.DecimalField(max_digits=15, decimal_places=2, help_text="Total value of priority projects in ETB")
    total_value = models.DecimalField(max_digits=15, decimal_places=2, help_text="Total portfolio value in ETB")
    is_active = models.BooleanField(default=True, help_text="Whether this is the active snapshot")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-snapshot_date']
        verbose_name = "Portfolio Status"
        verbose_name_plural = "Portfolio Status"

    def __str__(self):
        return f"Portfolio Status - {self.snapshot_date}"

    def save(self, *args, **kwargs):
        if self.is_active:
            # Ensure only one snapshot is active
            PortfolioStatus.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)

    def get_completed_percentage(self):
        """Calculate percentage of completed projects"""
        total = self.completed_count + self.ongoing_count + self.priority_count
        if total == 0:
            return 0
        return round((self.completed_count / total) * 100)

    def get_ongoing_percentage(self):
        """Calculate percentage of ongoing projects"""
        total = self.completed_count + self.ongoing_count + self.priority_count
        if total == 0:
            return 0
        return round((self.ongoing_count / total) * 100)

    def get_priority_percentage(self):
        """Calculate percentage of priority projects"""
        total = self.completed_count + self.ongoing_count + self.priority_count
        if total == 0:
            return 0
        return round((self.priority_count / total) * 100)

    def formatted_completed_value(self):
        """Return formatted completed value"""
        if self.completed_value >= 1000000000:
            return f"{(self.completed_value / 1000000000):.1f}B ETB"
        elif self.completed_value >= 1000000:
            return f"{(self.completed_value / 1000000):.1f}M ETB"
        else:
            return f"{self.completed_value:,.0f} ETB"

    def formatted_ongoing_value(self):
        """Return formatted ongoing value"""
        if self.ongoing_value >= 1000000000:
            return f"{(self.ongoing_value / 1000000000):.1f}B ETB"
        elif self.ongoing_value >= 1000000:
            return f"{(self.ongoing_value / 1000000):.1f}M ETB"
        else:
            return f"{self.ongoing_value:,.0f} ETB"

    def formatted_priority_value(self):
        """Return formatted priority value"""
        if self.priority_value >= 1000000000:
            return f"{(self.priority_value / 1000000000):.1f}B ETB"
        elif self.priority_value >= 1000000:
            return f"{(self.priority_value / 1000000):.1f}M ETB"
        else:
            return f"{self.priority_value:,.0f} ETB"

    def formatted_total_value(self):
        """Return formatted total value"""
        if self.total_value >= 1000000000:
            return f"{(self.total_value / 1000000000):.2f}B ETB"
        elif self.total_value >= 1000000:
            return f"{(self.total_value / 1000000):.1f}M ETB"
        else:
            return f"{self.total_value:,.0f} ETB"