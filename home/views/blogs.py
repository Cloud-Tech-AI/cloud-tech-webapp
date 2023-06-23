import logging
from markdown import markdown

from django.urls import reverse_lazy
from django.views.generic import DetailView, CreateView, UpdateView
from django_filters.views import FilterView
from django.contrib.auth.mixins import LoginRequiredMixin
from content.models import Blog
from web.filter import BlogFilter
from ..forms.blog import BlogCreateForm
from mixins.models import IsValidUserMixin


class BlogsListView(LoginRequiredMixin, FilterView):
    model = Blog
    filterset_class = BlogFilter
    template_name = 'home/blogs/blogs.html'
    context_object_name = 'blogs'
    ordering = ['-pub_date']

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(created_by=self.request.user)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filter'] = self.filterset_class
        return context


class BlogDetailView(LoginRequiredMixin, IsValidUserMixin, DetailView):
    model = Blog
    template_name = 'home/blogs/blog_detail.html'
    context_object_name = 'blog'
    pk_url_kwarg = 'pk'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['previous_page'] = self.request.META.get('HTTP_REFERER')
        markdown_text = self.object.body
        html_content = markdown(markdown_text)
        context['html_content'] = html_content
        return context
    

class BlogCreateView(LoginRequiredMixin, CreateView):
    model = Blog
    template_name = 'home/blogs/blog_create.html'
    form_class = BlogCreateForm
    success_url = reverse_lazy('home:blogs')

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        return super().form_valid(form)


class BlogUpdateView(LoginRequiredMixin, IsValidUserMixin, UpdateView):
    model = Blog
    template_name = 'home/blogs/blog_update.html'
    form_class = BlogCreateForm
    success_url = reverse_lazy('home:blogs')
    pk_url_kwarg = 'pk'

    def form_valid(self, form):
        form.instance.updated_by = self.request.user
        return super().form_valid(form)


