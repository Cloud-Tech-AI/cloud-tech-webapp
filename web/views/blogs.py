import logging
import markdown2
from django.views.generic import ListView,DetailView
from django_filters.views import FilterView
from django_tenants.utils import tenant_context
from django.db.models import Value, CharField, Prefetch
from content.models import Blog
from community.models import Community
from mixins.views import GetTenantsMixin
from ..filters import BlogFilter


class BlogsListView(GetTenantsMixin, ListView):
    model = Blog
    filterset_class = BlogFilter
    template_name = 'blogs.html'
    ordering = ['-pub_date']

    def get_queryset(self, **kwargs):
        if 'tenant' in kwargs:
            tenant = kwargs['tenant']
            return Blog.objects.all().annotate(
                tenant_name=Value(tenant.name, output_field=CharField()),
            ).prefetch_related(Prefetch('tags'))
        return super().get_queryset(**kwargs)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tenants'] = self.get_tenants()
        blogs = []
        for tenant in context['tenants']:
            with tenant_context(tenant):
                filtered_blogs = self.filterset_class(self.request.GET, queryset=self.get_queryset(tenant = tenant))
                blogs.extend(list(filtered_blogs.qs))
        context['blogs'] = sorted(blogs, key=lambda x: x.pub_date, reverse=True)
        context['filter'] = self.filterset_class
        return context
    
class BlogDetailView(GetTenantsMixin, DetailView):
    model = Blog
    template_name = 'detailed/blog_detail.html'
    context_object_name = 'blog'

    def get_object(self):
        tenant = Community.objects.get(name=self.kwargs['tenant'])
        with tenant_context(tenant):
            tenant_blogs = Blog.objects.all().prefetch_related(Prefetch('tags'))
            return tenant_blogs.get(pk=self.kwargs['pk'])
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['previous_page'] = self.request.META.get('HTTP_REFERER')
        context['tenants'] = self.get_tenants()
        markdown_text = self.object.body
        html_content = markdown2.markdown(markdown_text)
        context['html_content'] = html_content
        return context