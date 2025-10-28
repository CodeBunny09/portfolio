# backend/portfolio/views.py
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Profile, Project, BlogPost, ContactPlatform
from rest_framework import viewsets
from .serializers import ProfileSerializer, ProjectSerializer, BlogPostSerializer, ContactPlatformSerializer
from rest_framework.generics import RetrieveAPIView




class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    
    def get_object(self):
        return get_object_or_404(Profile, is_active=True)

class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        queryset = Project.objects.filter(is_visible=True)
        
        # Filter by featured projects
        featured_only = self.request.query_params.get('featured', None)
        if featured_only and featured_only.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # Filter by project type
        project_type = self.request.query_params.get('type', None)
        if project_type:
            queryset = queryset.filter(project_type=project_type)
        
        # Limit results
        limit = self.request.query_params.get('limit', None)
        if limit:
            try:
                queryset = queryset[:int(limit)]
            except ValueError:
                pass
                
        return queryset

class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.filter(is_visible=True)
    serializer_class = ProjectSerializer

class BlogPostListView(generics.ListAPIView):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer

@api_view(['GET'])
def api_health(request):
    """Simple health check endpoint"""
    return Response({
        'status': 'healthy',
        'message': 'Portfolio API is running'
    }, status=status.HTTP_200_OK)



# Contacts Page
class ContactPlatformViewSet(viewsets.ModelViewSet):
    queryset = ContactPlatform.objects.all()
    serializer_class = ContactPlatformSerializer