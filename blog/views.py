from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.core.paginator import Paginator

from .models import Post, Category

# Create your views here.

PER_PAGE = 4

def index(request,id=1):
    return render(request, 'index.html')


@require_http_methods(['GET'])
def posts(request):
    try:
        category = str(request.GET.get('category'))
        if category:
            cate = Category.objects.get(slug=category)
            posts = cate.posts_cat.all().order_by('-created_at')
        else:
            posts = Post.objects.all().order_by('-created_at')
        page = int(request.GET.get('page'))
        p = Paginator(posts,int(request.GET.get('quantity')) or PER_PAGE)
        num_pages = p.num_pages
        data_page = p.page(page)
        to_serialize = data_page.object_list
        status = data_page.has_other_pages()
        first_or_last = 'first'
        if data_page.has_previous() and data_page.has_next():
            first_or_last = False
        elif data_page.has_previous() and not data_page.has_next():
            first_or_last = 'last'
        data = [post.serialize() for post in to_serialize]
        return JsonResponse({'posts': data, 'otherPages': status, "numberOfPages":num_pages, 'firstOrLast': first_or_last})
    except Exception as e:
        return JsonResponse({'error': e})


@require_http_methods(['GET'])
def post(request,id):
    try:
        post = Post.objects.get(id=id).serialize()
        return JsonResponse({'post': post})
    except Exception as e:
        return JsonResponse({'error': e})


@require_http_methods(['GET'])
def categories(request):
    try:
        categories  = Category.objects.all()
        data = [category.serialize() for category in categories]
        return JsonResponse({'categories': data})
    except Exception as e:
        return JsonResponse({'error': e})