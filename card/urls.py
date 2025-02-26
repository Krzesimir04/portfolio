
from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='index'),
    path('api/testimonials',views.api_testimonials, name='index'),
]
