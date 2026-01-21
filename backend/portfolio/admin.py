from django.contrib import admin
from django import forms
from .models import Profile, SocialLink, Project, TechStack, BlogPost, ContactPlatform, GalleryImage, GalleryComment, GalleryLike, Resume

class ProjectAdminForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        image = cleaned_data.get('featured_image')

        print("[DEBUG] Cleaning Project form:")
        print(f" - Featured Image: {image}")

        # No need to check image_url anymore (it was removed from the model)
        return cleaned_data


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    form = ProjectAdminForm
    list_display = ['title', 'project_type', 'is_featured', 'is_visible', 'created_at']
    list_filter = ['project_type', 'is_featured', 'is_visible', 'status']
    search_fields = ['title', 'description']
    filter_horizontal = ['tech_stack']
    ordering = ['-is_featured', 'order', '-created_at']
    fieldsets = (
        ('Basic Info', {
            'fields': ('title', 'description', 'long_description', 'project_type', 'status')
        }),
        ('URLs', {
            'fields': ('project_url', 'github_url', 'demo_url', 'linkedin_post_url')
        }),
        ('Media', {
            'fields': ('featured_image',)  # removed featured_image_url
        }),
        ('Tech & Stats', {
            'fields': ('tech_stack', 'github_stars', 'github_forks', 'linkedin_likes', 'linkedin_comments')
        }),
        ('Display Options', {
            'fields': ('is_featured', 'is_visible', 'order', 'project_date')
        }),
    )

# Other admin registrations
# admin.py
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    fieldsets = (
        (None, {
            'fields': ('name', 'tagline', 'bio')
        }),
        ('Image', {
            'fields': ('profile_image', 'profile_image_url'),
            'description': "Upload a Profile image OR provide a URL. URLs can be absolute (https://...) or relative (e.g. ./src/assets/mypic.png).",
        }),
        ('Status', {'fields': ('is_active',)}),
    )
class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 1
    ordering = ['order']

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['profile', 'platform', 'url', 'is_visible', 'order']
    list_filter = ['platform', 'is_visible']
    ordering = ['profile', 'order']

@admin.register(TechStack)
class TechStackAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'color']
    list_filter = ['category']
    search_fields = ['name']

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_published', 'published_at', 'created_at']
    list_filter = ['is_published', 'created_at']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(ContactPlatform)
class ContactPlatformAdmin(admin.ModelAdmin):
    list_display = ['title', 'url', 'order']
    search_fields = ['title', 'description', 'url']
    ordering = ['order', 'title']




@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'image']
    search_fields = ['title', 'description', 'tags']
    ordering = ['-date']

@admin.register(GalleryComment)
class GalleryCommentAdmin(admin.ModelAdmin):
    list_display = ['image', 'text', 'created_at']
    search_fields = ['text']

@admin.register(GalleryLike)
class GalleryLikeAdmin(admin.ModelAdmin):
    list_display = ['image', 'created_at']



@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ['title', 'file', 'uploaded_at']
