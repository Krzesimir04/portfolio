from django.test import TestCase,Client
from .models import Project, Skill, User, Testimonial
# Create your tests here.

class ViewsTests(TestCase):
    def setUp(self):
        User.objects.create_superuser(email='admin@gmail.com', full_name='admin',password='zaq1@WSX').save()
        skill = Skill.objects.create(name="Python", proficiency=90)

        project = Project.objects.create(
            title="My Portfolio",
            description="A personal portfolio website.",
            github_link="https://github.com/user/portfolio",
            live_demo="https://myportfolio.com"
        )
        project.technologies.add(skill)

        Testimonial.objects.create(
            client_name="Joanna af",
            shortText="Great experience working with this developer! ufasdf",
            company="Tech Solutions INC"
        )

    def test_request(self):
        c= Client()
        req1 = c.get('')
        self.assertEqual(req1.status_code,200)


    def test_api(self):
        c = Client()
        req1 = c.get('/api/testimonials')
        print(req1.content)
        self.assertTrue(req1.content.decode())