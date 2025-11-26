from rest_framework import serializers
from .models import *

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['platform', 'url', 'display_name', 'is_visible']

class ProfileSerializer(serializers.ModelSerializer):
    social_links = SocialLinkSerializer(many=True, read_only=True)
    profile_image_url = serializers.CharField()

    class Meta:
        model = Profile
        fields = ['name', 'tagline', 'bio', 'profile_image_url', 'social_links']

class TechStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStack
        fields = ['name', 'color', 'category']

class ProjectSerializer(serializers.ModelSerializer):
    tech_stack = TechStackSerializer(many=True, read_only=True)
    link = serializers.SerializerMethodField()
    image = serializers.CharField(source='featured_image_url')
    type = serializers.CharField(source='project_type')

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'type', 'link', 'image',
            'tech_stack', 'is_featured', 'github_stars', 'github_forks',
            'linkedin_likes', 'linkedin_comments', 'created_at', 'project_date'
        ]

    def get_link(self, obj):
        return obj.primary_link

class BlogPostSerializer(serializers.ModelSerializer):
    featured_image_url = serializers.CharField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image_url',
            'published_at', 'created_at'
        ]

class GalleryCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryComment
        fields = ['id', 'text', 'created_at']

class GalleryImageSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()
    comments = GalleryCommentSerializer(many=True, read_only=True)
    image_url = serializers.CharField()
    tags = serializers.SerializerMethodField()

    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'description', 'image_url', 'tags', 'date', 'created_at', 'likes', 'comments']

    def get_likes(self, obj):
        return obj.likes.count()

    def get_tags(self, obj):
        return obj.tag_list()

class ResumeSerializer(serializers.ModelSerializer):
    file_url = serializers.CharField()

    class Meta:
        model = Resume
        fields = ['id', 'title', 'file_url', 'uploaded_at']

class ContactPlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPlatform
        fields = ['id', 'title', 'description', 'url', 'order']
