# backend/portfolio/models.py
from django.db import models
from django.core.validators import URLValidator
import uuid
from django.conf import settings

# models.py

class Profile(models.Model):
    name = models.CharField(max_length=100, default="Pratik")
    tagline = models.TextField(default="dev, analyst, designer, creator")
    bio = models.TextField(max_length=500)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)

    # ⬇️ allow relative or absolute strings (no URL validation)
    profile_image_url = models.CharField(max_length=500, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.name



class SocialLink(models.Model):
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('twitter', 'Twitter'),
        ('blog', 'Blog'),
        ('email', 'Email'),
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        ('other', 'Other'),
    ]
    
    profile = models.ForeignKey(Profile, related_name='social_links', on_delete=models.CASCADE)
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    url = models.URLField()
    display_name = models.CharField(max_length=100, blank=True)
    is_visible = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'platform']
        unique_together = ['profile', 'platform']

    def __str__(self):
        return f"{self.profile.name} - {self.get_platform_display()}"

class TechStack(models.Model):
    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=7, default="#FF2DD1")  # Hex color
    category = models.CharField(max_length=50, blank=True)  # frontend, backend, database, etc.

    class Meta:
        ordering = ['category', 'name']

    def __str__(self):
        return self.name


class Project(models.Model):
    PROJECT_TYPES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('personal', 'Personal'),
        ('client', 'Client'),
    ]

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('archived', 'Archived'),
        ('draft', 'Draft'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    long_description = models.TextField(blank=True)
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPES, default='personal')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')

    # URLs
    project_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    demo_url = models.URLField(blank=True, null=True)
    linkedin_post_url = models.URLField(blank=True, null=True)

    # Media
    featured_image = models.ImageField(upload_to='projects/', blank=True, null=True)
    # removed featured_image_url completely

    # Tech stack
    tech_stack = models.ManyToManyField('TechStack', blank=True)

    # Stats
    github_stars = models.PositiveIntegerField(default=0)
    github_forks = models.PositiveIntegerField(default=0)
    linkedin_likes = models.PositiveIntegerField(default=0)
    linkedin_comments = models.PositiveIntegerField(default=0)

    # Display
    is_featured = models.BooleanField(default=False)
    is_visible = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    project_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['-is_featured', 'order', '-created_at']

    def __str__(self):
        return self.title

    @property
    def primary_link(self):
        if self.project_type == 'github' and self.github_url:
            return self.github_url
        elif self.project_type == 'linkedin' and self.linkedin_post_url:
            return self.linkedin_post_url
        elif self.demo_url:
            return self.demo_url
        elif self.project_url:
            return self.project_url
        return self.github_url

    @property
    def featured_image_url(self):
        """
        Returns the absolute URL of the uploaded image (for API/Frontend).
        """
        if self.featured_image:
            try:
                request = getattr(self, '_request', None)
                if request:
                    return request.build_absolute_uri(self.featured_image.url)
            except Exception:
                pass
            return f"{settings.MEDIA_URL}{self.featured_image}"
        return None

    @property
    def stats(self):
        if self.project_type == 'github':
            return {'stars': self.github_stars, 'forks': self.github_forks}
        elif self.project_type == 'linkedin':
            return {'likes': self.linkedin_likes, 'comments': self.linkedin_comments}
        return {}


class BlogPost(models.Model):
    """For future blog functionality"""
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.TextField(max_length=300)
    content = models.TextField()
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title
    

class ContactPlatform(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    url = models.URLField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    title = models.CharField(max_length=180)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="gallery/images/")
    tags = models.CharField(max_length=250, blank=True, help_text="Comma separated")
    date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def tag_list(self):
        return [tag.strip() for tag in self.tags.split(",") if tag.strip()] if self.tags else []

    def __str__(self):
        return self.title

class GalleryComment(models.Model):
    image = models.ForeignKey(GalleryImage, related_name="comments", on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # For anonymous, no user field

class GalleryLike(models.Model):
    image = models.ForeignKey(GalleryImage, related_name="likes", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    # For anonymous, no user field


class Resume(models.Model):
    title = models.CharField(max_length=120, default="Resume")
    file = models.FileField(upload_to="resume/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
