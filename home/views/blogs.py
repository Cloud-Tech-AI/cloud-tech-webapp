from django.views.generic import ListView
from content.models import Blog

class BlogListView(ListView):
    model = Blog
    template_name = 'home/blogs.html'
    context_object_name = 'blogs'