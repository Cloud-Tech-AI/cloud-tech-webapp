from markdown import markdown
from django.views.generic import ListView, DetailView
from django_tenants.utils import tenant_context
from django.db.models import Value, CharField, Prefetch
from content.models import Blog
from community.models import Community
from mixins.views import GetTenantsMixin

class BlogsListView(GetTenantsMixin, ListView):
    model = Blog
    template_name = 'blogs.html'
    context_object_name = 'blogs'
    ordering = ['created_at']

    def get_queryset(self):
        blogs = []
        for tenant in self.get_tenants():
            with tenant_context(tenant):
                tenant_blogs = Blog.objects.all().annotate(
                    tenant_name=Value(tenant.name, output_field=CharField()),
                ).prefetch_related(Prefetch('tags'))
                blogs.extend(tenant_blogs)
        return blogs
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tenants'] = self.get_tenants()
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
        markdown_text = self.object.body
        html_content = markdown(markdown_text)
        context['html_content'] = html_content
        return context