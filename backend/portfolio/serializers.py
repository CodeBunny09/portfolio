from rest_framework import serializers
from rest_framework import serializers
from .models import Profile, SocialLink, Project, TechStack, BlogPost, ContactPlatform, GalleryImage, GalleryComment, GalleryLike, Resume
from django.conf import settings



# serializers.py
class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['platform', 'url', 'display_name', 'is_visible']

class ProfileSerializer(serializers.ModelSerializer):
    social_links = SocialLinkSerializer(many=True, read_only=True)
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['name', 'tagline', 'bio', 'profile_image_url', 'social_links']

    def get_profile_image_url(self, obj):
        # 1) If a file is uploaded, return its absolute URL
        if obj.profile_image:
            request = self.context.get('request')
            url = obj.profile_image.url
            return request.build_absolute_uri(url) if request else url

        # 2) If a string is stored, allow both absolute and relative
        val = (obj.profile_image_url or "").strip()
        if not val:
            return None

        # Absolute URL -> return as-is
        if val.startswith("http://") or val.startswith("https://"):
            return val

        # Relative path -> optionally prefix with a base (if you set it), else return as-is
        base = getattr(settings, "FRONTEND_ASSET_BASE", "").rstrip("/")
        if base:
            # Normalize leading './' to '/' and join
            cleaned = val[1:] if val.startswith("./") else val
            if not cleaned.startswith("/"):
                cleaned = "/" + cleaned
            return f"{base}{cleaned}"
        return val

class TechStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStack
        fields = ['name', 'color', 'category']

# serializers.py
class ProjectSerializer(serializers.ModelSerializer):
    tech_stack = TechStackSerializer(many=True, read_only=True)
    tech_stack_names = serializers.SerializerMethodField()
    link = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    type = serializers.CharField(source='project_type')

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'type', 'link', 'image',
            'tech_stack', 'tech_stack_names', 'is_featured',
            'github_stars', 'github_forks', 'linkedin_likes', 'linkedin_comments',
            'created_at', 'project_date'
        ]

    def get_tech_stack_names(self, obj):
        return [tech.name for tech in obj.tech_stack.all()]

    def get_link(self, obj):
        return obj.primary_link

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.featured_image:
            return request.build_absolute_uri(obj.featured_image.url) if request else obj.featured_image.url
        if obj.featured_image_url:
            return obj.featured_image_url
        return None


class BlogPostSerializer(serializers.ModelSerializer):
    featured_image_url = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image_url',
            'published_at', 'created_at'
        ]

    def get_featured_image_url(self, obj):
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
        return None


# serializers.py (in your django app)

class ContactPlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPlatform
        fields = ['id', 'title', 'description', 'url', 'order']  # Include 'order' if you want it exposed





class GalleryCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryComment
        fields = ['id', 'text', 'created_at']

class GalleryImageSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()
    comments = GalleryCommentSerializer(many=True, read_only=True)
    image_url = serializers.ImageField(source='image', read_only=True)
    tags = serializers.SerializerMethodField()

    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'description', 'image_url', 'tags', 'date', 'created_at', 'likes', 'comments']

    def get_likes(self, obj):
        return obj.likes.count()

    def get_tags(self, obj):
        return obj.tag_list()



class ResumeSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Resume
        fields = ['id', 'title', 'file_url', 'uploaded_at']

    def get_file_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url) if request else obj.file.url
