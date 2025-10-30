# backend/portfolio/views.py
from rest_framework import generics, status, viewsets, permissions
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Profile, Project, BlogPost, ContactPlatform, Resume
from rest_framework import viewsets
from .serializers import ProfileSerializer, ProjectSerializer, BlogPostSerializer, ContactPlatformSerializer, ResumeSerializer
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



from .models import GalleryImage, GalleryComment, GalleryLike
from .serializers import GalleryImageSerializer, GalleryCommentSerializer

class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by('-date')
    serializer_class = GalleryImageSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        img = self.get_object()
        text = request.data.get('text')
        if text:
            comment = GalleryComment(image=img, text=text)
            comment.save()
            return Response(GalleryCommentSerializer(comment).data, status=201)
        return Response({'error': 'Text required.'}, status=400)

    @action(detail=True, methods=['post'])
    def add_like(self, request, pk=None):
        img = self.get_object()
        like = GalleryLike(image=img)
        like.save()
        return Response({'message': 'Like added', 'like_count': img.likes.count()}, status=201)

    @action(detail=True, methods=['get'])
    def get_meta(self, request, pk=None):
        img = self.get_object()
        return Response({
            'likes': img.likes.count(),
            'comments': GalleryCommentSerializer(img.comments.all(), many=True).data
        })
    

class ResumeListView(generics.ListAPIView):
    queryset = Resume.objects.order_by('-uploaded_at')
    serializer_class = ResumeSerializer
    permission_classes = [permissions.AllowAny]
