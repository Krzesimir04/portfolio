
from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='blog'),
    path('api/posts', views.posts),
    path('api/categories', views.categories),
]
