
from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='blog'),
    path('post/<int:id>', views.index, name='blog'),
    path('api/posts', views.posts),
    path('api/posts/<int:id>', views.post),
    path('api/categories', views.categories),
]
