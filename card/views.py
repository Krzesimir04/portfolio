from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Testimonial, Project, Skill
# Create your views here.

def index(request):
    if(request.user.is_authenticated and request.user.is_admin):
        return render(request, 'index.html', {"is_admin": request.user.is_admin})
    return render(request, 'index.html')

@require_http_methods(['GET'])
def api_testimonials(request):
    try:
        if request.method == 'GET':
            testimonials  = Testimonial.objects.all()
            data = [testimonial.serialize() for testimonial in testimonials]
            return JsonResponse({'testimonials': data})
    except Exception :
        return JsonResponse({'error': 'Error occurred, we will fix it soon :)'})

@require_http_methods(['GET'])
def api_skills(request):
    try:
        if request.method == 'GET':
            skills = Skill.objects.all()
            data = [skill.serialize() for skill in skills]
            return JsonResponse({'skills': data})
    except Exception:
        return JsonResponse({'error': 'Error occurred, we will fix it soon :)'})


@require_http_methods(['GET'])
def api_projects(request):
    try:
        if request.method == 'GET':
            projects = Project.objects.all().order_by('-created_at')
            data = [project.serialize() for project in projects]
            return JsonResponse({'projects': data})
    except Exception as e:
        return JsonResponse({'error': 'Error occurred, we will fix it soon :)'})
