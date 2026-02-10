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
    image = models.ImageField(upload_to='slider/')
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


class FinancialMetrics(models.Model):
    """Overall financial metrics (singleton pattern)."""
    total_budget = models.DecimalField(max_digits=15, decimal_places=2)
    total_expenditure = models.DecimalField(max_digits=15, decimal_places=2)
    total_projects = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Financial Metrics'

    def __str__(self):
        return f"Financial Metrics (Updated: {self.updated_at.strftime('%Y-%m-%d')})"

    def save(self, *args, **kwargs):
        """Ensure only one active instance exists."""
        if self.is_active:
            FinancialMetrics.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)

    def format_budget(self):
        """Format budget in billions or millions."""
        value = float(self.total_budget)
        if value >= 1_000_000_000:
            return f"{value / 1_000_000_000:.2f}B ETB"
        elif value >= 1_000_000:
            return f"{value / 1_000_000:.2f}M ETB"
        return f"{value:,.2f} ETB"

    def format_expenditure(self):
        """Format expenditure in billions or millions."""
        value = float(self.total_expenditure)
        if value >= 1_000_000_000:
            return f"{value / 1_000_000_000:.2f}B ETB"
        elif value >= 1_000_000:
            return f"{value / 1_000_000:.2f}M ETB"
        return f"{value:,.2f} ETB"


class FiscalYear(models.Model):
    """Fiscal year periods."""
    year = models.CharField(max_length=20)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-year']

    def __str__(self):
        return self.year


class FinanceProject(models.Model):
    """Individual finance projects."""
    fiscal_year = models.ForeignKey(FiscalYear, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=300)
    budget = models.DecimalField(max_digits=15, decimal_places=2)
    expenditure = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    is_outstanding = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.fiscal_year.year})"


class PortfolioStatus(models.Model):
    """Portfolio status breakdown (singleton pattern)."""
    completed_count = models.IntegerField(default=0)
    ongoing_count = models.IntegerField(default=0)
    priority_count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Portfolio Status'

    def __str__(self):
        return f"Portfolio Status (Updated: {self.updated_at.strftime('%Y-%m-%d')})"

    def save(self, *args, **kwargs):
        """Ensure only one active instance exists."""
        if self.is_active:
            PortfolioStatus.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)

    def get_total(self):
        """Get total count of all projects."""
        return self.completed_count + self.ongoing_count + self.priority_count

    def get_completed_percentage(self):
        """Calculate completed percentage."""
        total = self.get_total()
        if total == 0:
            return 0
        return round((self.completed_count / total) * 100, 1)

    def get_ongoing_percentage(self):
        """Calculate ongoing percentage."""
        total = self.get_total()
        if total == 0:
            return 0
        return round((self.ongoing_count / total) * 100, 1)

    def get_priority_percentage(self):
        """Calculate priority percentage."""
        total = self.get_total()
        if total == 0:
            return 0
        return round((self.priority_count / total) * 100, 1)


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
