"""
Django models for the main application.
"""
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class HomeSlider(models.Model):
    """Homepage slider/carousel items."""
    title = models.CharField(max_length=200)
    tagline = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    video = models.FileField(upload_to='slider/videos/', blank=True, null=True)
    image = models.ImageField(upload_to='slider/images/', blank=True, null=True)
    link = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.title


class CompanyStatistic(models.Model):
    """Company statistics displayed on homepage."""
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=50)
    icon = models.CharField(max_length=100, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.label}: {self.value}"


class Partner(models.Model):
    """Partner/client logos."""
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='partner/')
    website = models.URLField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    """Client testimonials and reviews."""
    client_name = models.CharField(max_length=200)
    client_role = models.CharField(max_length=200, blank=True)
    review = models.TextField()
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        default=5
    )
    image = models.ImageField(upload_to='testimonials/', blank=True)
    attachment = models.FileField(upload_to='testimonials/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.client_name} - {self.rating} stars"


class JobVacancy(models.Model):
    """Job vacancy postings."""
    JOB_TYPE_CHOICES = [
        ('Full Time', 'Full Time'),
        ('Half Time', 'Half Time'),
        ('Remote', 'Remote'),
        ('In Office', 'In Office'),
    ]

    DESIGNATION_CHOICES = [
        ('Junior', 'Junior'),
        ('Mid-Level', 'Mid-Level'),
        ('Senior', 'Senior'),
        ('Lead', 'Lead'),
        ('Manager', 'Manager'),
    ]

    title = models.CharField(max_length=200)
    designation = models.CharField(max_length=50, choices=DESIGNATION_CHOICES)
    job_type = models.CharField(max_length=50, choices=JOB_TYPE_CHOICES)
    industry = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    requirements = models.TextField()
    qualifications = models.TextField()
    min_salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    max_salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    location = models.CharField(max_length=200, blank=True)
    posted_date = models.DateField(auto_now_add=True)
    deadline = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-posted_date']
        verbose_name_plural = 'Job Vacancies'

    def __str__(self):
        return f"{self.title} - {self.designation}"

    def get_salary_range(self):
        """Return formatted salary range."""
        if self.min_salary and self.max_salary:
            return f"${self.min_salary:,.0f} - ${self.max_salary:,.0f}"
        return "Negotiable"


class JobApplication(models.Model):
    """Job applications submitted by candidates."""
    job_title = models.CharField(max_length=200)
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    cv = models.FileField(upload_to='cvs/')
    cover_letter = models.TextField(blank=True)
    applied_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-applied_date']

    def __str__(self):
        return f"{self.full_name} - {self.job_title}"



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


class MediaMosaicItem(models.Model):
    """Media gallery items (images and videos)."""
    MEDIA_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]

    CATEGORY_CHOICES = [
        ('all', 'All'),
        ('events', 'Events'),
        ('projects', 'Projects'),
        ('team', 'Team'),
        ('facilities', 'Facilities'),
    ]

    title = models.CharField(max_length=200)
    type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES)
    category = models.CharField(max_length=50,default='all')
    description = models.TextField(default="description")
    src = models.FileField(upload_to='media_mosaic/')
    thumbnail = models.ImageField(upload_to='media_mosaic/thumbnails/', blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.title} ({self.type})"


class SocialWelfareStory(models.Model):
    """Social welfare stories and initiatives."""
    title = models.CharField(max_length=300)
    description = models.TextField()
    image = models.ImageField(upload_to='social_welfare/')
    link = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name_plural = 'Social Welfare Stories'

    def __str__(self):
        return self.title


class ChatBotConfig(models.Model):
    """Chatbot configuration (singleton pattern)."""
    api_key = models.CharField(max_length=500)
    context = models.TextField(
        help_text="Context/instructions for the chatbot about the organization"
    )
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Chatbot Configuration'
        verbose_name_plural = 'Chatbot Configuration'

    def __str__(self):
        return f"Chatbot Config (Active: {self.is_active})"

    def save(self, *args, **kwargs):
        """Ensure only one active instance exists."""
        if self.is_active:
            ChatBotConfig.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)
