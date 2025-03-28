from django.db import models
from django.utils.text import slugify

from card.models import User
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def serialize(self):
        return{
            'name':self.name,
            'slug':self.slug
        }
    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    category = models.ManyToManyField(Category, blank=True, related_name="posts_cat")
    featured_image = models.ImageField(upload_to="blog/images", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True)

    def serialize(self):
        return{
            'id': self.id,
            'title':self.title,
            'author':self.author.full_name,
            'content':self.content,
            'categories': [category.serialize() for category in self.category.all()],
            'featuredImage':self.featured_image.url if self.featured_image else None,
            'createdAt':self.created_at,
            'isPublished':self.is_published,
        }

    def __str__(self):
        return self.title
