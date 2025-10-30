from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'contact-platforms', views.ContactPlatformViewSet, basename='contact-platform')
router.register(r'gallery', views.GalleryImageViewSet, basename='gallery')

urlpatterns = [
    path('health/', views.api_health, name='health'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('projects/', views.ProjectListView.as_view(), name='projects'),
    path('projects/<uuid:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('blog/', views.BlogPostListView.as_view(), name='blog'),
    path('resume/', views.ResumeListView.as_view(), name='resume-list'),
    path('', include(router.urls)),  
]
