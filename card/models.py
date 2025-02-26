from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser


class MyUserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            full_name=full_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            full_name=full_name,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    full_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Skill(models.Model):
    name = models.CharField(max_length=100)
    proficiency = models.IntegerField(help_text="Enter a value from 1-100 for skill level")
    icon = models.ImageField(upload_to="skills/", blank=True, null=True)

    def serialize(self):
        return {
            "name": self.name,
            "proficiency": self.proficiency,
            "icon": self.icon.url if self.icon else None,
        }

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.ManyToManyField(Skill)
    image = models.ImageField(upload_to="projects/front_image", blank=True, null=True)
    logo = models.ImageField(upload_to="projects/logo", blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    live_demo = models.URLField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    def serialize(self):
        return {
            "title": self.title,
            "description": self.description,
            "technologies": [skill.name for skill in self.technologies.all()],
            "image": self.image.url if self.image else None,
            "logo": self.logo.url if self.logo else None,
            "githubLink": self.github_link,
            "liveDemo": self.live_demo,
            "createdAt": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    client_name = models.CharField(max_length=200)
    shortText = models.TextField()
    company = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    file = models.FileField(upload_to="references/", blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    def serialize(self):
        return {
            "clientName": self.client_name,
            "shortText": self.shortText,
            "company": self.company if self.company else None,
            "image": self.image.url if self.image else None,
            "file": self.file.url if self.file else None,
            "createdAt": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }

    def __str__(self):
        return f"Testimonial from {self.client_name}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"