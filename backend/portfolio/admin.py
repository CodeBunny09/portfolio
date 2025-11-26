from django.contrib import admin
from django import forms
from django.utils.html import format_html
from .models import *
from .forms import *

class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 1
    ordering = ['order']

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    form = ProfileAdminForm
    list_display = ['name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    inlines = [SocialLinkInline]
    fieldsets = (
        (None, {'fields': ('name', 'tagline', 'bio', 'profile_image')}),
        ('Image', {'fields': ('profile_image_url',)}),
        ('Status', {'fields': ('is_active',)}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    form = ProjectAdminForm
    list_display = [
        'title', 'project_type', 'is_featured', 'is_visible',
        'created_at', 'featured_image_url'
    ]
    list_filter = ['project_type', 'is_featured', 'is_visible', 'status']
    search_fields = ['title', 'description']
    filter_horizontal = ['tech_stack']
    ordering = ['-is_featured', 'order', '-created_at']
    fieldsets = (
        ('Basic Info', {'fields': ('title', 'description', 'long_description', 'project_type', 'status')}),
        ('URLs', {'fields': ('project_url', 'github_url', 'demo_url', 'linkedin_post_url')}),
        ('Media', {'fields': ('featured_image', 'featured_image_url')}),
        ('Tech & Stats', {'fields': ('tech_stack', 'github_stars', 'github_forks', 'linkedin_likes', 'linkedin_comments')}),
        ('Display Options', {'fields': ('is_featured', 'is_visible', 'order', 'project_date')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
    readonly_fields = ('created_at', 'updated_at')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostAdminForm
    list_display = ['title', 'is_published', 'published_at', 'created_at', 'featured_image_url']
    list_filter = ['is_published', 'created_at']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    fieldsets = (
        (None, {'fields': ('title', 'slug', 'excerpt', 'content', 'is_published')}),
        ('Image', {'fields': ('featured_image', 'featured_image_url')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at', 'published_at')}),
    )
    readonly_fields = ('created_at', 'updated_at', 'published_at')

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    form = GalleryImageAdminForm
    list_display = ['title', 'date', 'image_url']
    search_fields = ['title', 'description', 'tags']
    ordering = ['-date']
    fieldsets = (
        (None, {'fields': ('title', 'description', 'tags', 'date')}),
        ('Image', {'fields': ('image', 'image_url')}),
        ('Timestamps', {'fields': ('created_at',)}),
    )
    readonly_fields = ('created_at', 'date')

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    form = ResumeAdminForm
    list_display = ['title', 'file_url', 'uploaded_at']
    search_fields = ['title', 'file_url']
    ordering = ['-uploaded_at']
    fieldsets = (
        (None, {'fields': ('title', 'file', 'file_url')}),
        ('Timestamps', {'fields': ('uploaded_at',)}),
    )
    readonly_fields = ('uploaded_at',)

@admin.register(TechStack)
class TechStackAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'color']
    list_filter = ['category']
    search_fields = ['name']

@admin.register(ContactPlatform)
class ContactPlatformAdmin(admin.ModelAdmin):
    list_display = ['title', 'url', 'order']
    search_fields = ['title', 'description', 'url']
    ordering = ['order', 'title']

@admin.register(GalleryComment)
class GalleryCommentAdmin(admin.ModelAdmin):
    list_display = ['image', 'text', 'created_at']
    search_fields = ['text']

@admin.register(GalleryLike)
class GalleryLikeAdmin(admin.ModelAdmin):
    list_display = ['image', 'created_at']
