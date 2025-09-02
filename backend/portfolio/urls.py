# backend/portfolio/urls.py
from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path('health/', views.api_health, name='health'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('projects/', views.ProjectListView.as_view(), name='projects'),
    path('projects/<uuid:pk>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('blog/', views.BlogPostListView.as_view(), name='blog'),
    path("profile/", views.ProfileView.as_view(), name="profile")
]