from markdown import markdown

from django.views.generic import ListView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from content.models import Blog

class BlogsListView(LoginRequiredMixin, ListView):
    model = Blog
    template_name = 'home/blogs/blogs.html'
    context_object_name = 'blogs'
    ordering = ['created_at']


class BlogDetailView(LoginRequiredMixin, DetailView):
    model = Blog
    template_name = 'home/blogs/blog_detail.html'
    context_object_name = 'blog'
    pk_url_kwarg = 'pk'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        markdown_text = self.object.body
        html_content = markdown(markdown_text)
        context['html_content'] = html_content
        return context


