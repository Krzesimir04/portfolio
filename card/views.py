from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Testimonial, Project, Skill, User
# Create your views here.

def index(request):
    return render(request, 'index.html')

@require_http_methods(['POST','GET'])
def api_testimonials(request):
    try:
        if request.method == 'GET':
            print(request)
            testimonials  = Testimonial.objects.all()
            data = [testimonial.serialize() for testimonial in testimonials]
            return JsonResponse({'testimonials': data})
    except Exception :
        return JsonResponse({'error': 'Error occurred, we will fix it soon :)'})
