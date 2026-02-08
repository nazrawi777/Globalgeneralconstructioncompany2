"""
URL configuration for main application.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('services/', views.services_view, name='services'),
    path('team/', views.team_view, name='team'),
    path('blog/', views.blog_view, name='blog'),
    path('contact/', views.contact_view, name='contact'),
    path('project/', views.project_view, name='project'),
    path('finance/', views.finance_view, name='finance'),
    path('social-welfare/', views.social_welfare_view, name='social_welfare'),
    path('agriculture/', views.agriculture_view, name='agriculture'),
    path('coming-soon/', views.coming_soon_view, name='coming_soon'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('candidates/', views.candidates_view, name='candidates'),
    path('job-post/', views.job_post_view, name='job_post'),
    path('jobs/', views.job_list_view, name='job_list'),
    path('jobs/<int:job_id>/', views.job_detail_view, name='job_detail'),
    path('jobs/<int:job_id>/apply/', views.job_apply_view, name='job_apply'),
    path('api/chat/', views.ChatView.as_view(), name='chat_api'),
]
