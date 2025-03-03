from django.test import TestCase, Client
from .models import Post, Category, Comment
from card.models import User
# Create your tests here.

class APITest(TestCase):
    def setUp(self):
        user = User.objects.create(email="author@example.com", full_name="John Doe", password="securepassword")
        category1= Category.objects.create(name="Django")
        category2= Category.objects.create(name="Python")

        post1 = Post.objects.create(
            title="Getting Started with Django",
            author=user,
            content="Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design.",
            is_published=True
        )
        post1.category.add(category1, category2)
        post2 = Post.objects.create(
            title="Understanding Django ORM",
            author=user,
            content="Django's ORM provides a powerful yet easy-to-use way to interact with the database using Python code.",
            is_published=True
        )
        post2.category.add(category1)

    def test_api_get_post(self):
        c= Client()
        req1 = c.get('/blog/api/posts')

        self.assertEqual(req1.status_code, 200)