
from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='index'),
    path('api/testimonials',views.api_testimonials),
    path('api/skills',views.api_skills),
    path('api/projects',views.api_projects),
]
