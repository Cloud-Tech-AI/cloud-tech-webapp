import logging
from django.views.generic import TemplateView, RedirectView, ListView, DetailView
from django_tenants.utils import tenant_context, get_public_schema_name
from django.db.models import Value, CharField, Prefetch
from django.contrib.auth import get_user_model
from content.models import Blog, NewsLetter
from community.models import Tag
from mixins.views import GetTenantsMixin

User = get_user_model()

class Index(GetTenantsMixin, TemplateView):
    template_name = 'index.html'

class BlogsListView(GetTenantsMixin, ListView):
    model = Blog
    template_name = 'blogs.html'
    context_object_name = 'blogs'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        blogs = []
        logging.info(self.request.user)
        logging.info(context['tenants'])
        for tenant in context['tenants']:
            with tenant_context(tenant):
                tenant_blogs = Blog.objects.all().annotate(
                    tenant_name=Value(tenant.name, output_field=CharField()),
                ).prefetch_related(Prefetch('tags'))
                blogs.extend(tenant_blogs)
        
        sorted_blogs = sorted(blogs, key=lambda x: x.pub_date, reverse=True)
        context['blogs'] = sorted_blogs
        return context

class BlogDetailView(GetTenantsMixin, DetailView):
    model = Blog
    template_name = 'blog_detail.html'
    context_object_name = 'blog'
    pk_url_kwarg = 'pk'


class NewsLettersListView(GetTenantsMixin, ListView):
    model = NewsLetter
    template_name = 'newsletters.html'
    context_object_name = 'newsletters'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        newsletters = []
        logging.info(self.request.user)
        logging.info(context['tenants'])
        for tenant in context['tenants']:
            with tenant_context(tenant):
                tenant_newsletters = NewsLetter.objects.all().annotate(
                    tenant_name=Value(tenant.name, output_field=CharField()),
                ).prefetch_related(Prefetch('tags'))
                newsletters.extend(tenant_newsletters)
        
        sorted_newsletters = sorted(newsletters, key=lambda x: x.pub_date, reverse=True)
        context['newsletters'] = sorted_newsletters
        return context


class MonthlyListView(GetTenantsMixin, ListView):
    model = NewsLetter
    template_name = 'newsletters.html'
    context_object_name = 'newsletters'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        newsletters = []
        logging.info(self.request.user)
        logging.info(context['tenants'])
        for tenant in context['tenants']:
            with tenant_context(tenant):
                tenant_newsletters = NewsLetter.objects.all().annotate(
                    tenant_name=Value(tenant.name, output_field=CharField()),
                ).prefetch_related(Prefetch('tags'))
                newsletters.extend(tenant_newsletters)
        
        sorted_newsletters = sorted(newsletters, key=lambda x: x.pub_date, reverse=True)
        context['newsletters'] = sorted_newsletters
        return context



class ProjectsListView(GetTenantsMixin, ListView):
    model = NewsLetter
    template_name = 'newsletters.html'
    context_object_name = 'newsletters'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        newsletters = []
        logging.info(self.request.user)
        logging.info(context['tenants'])
        for tenant in context['tenants']:
            with tenant_context(tenant):
                tenant_newsletters = NewsLetter.objects.all().annotate(
                    tenant_name=Value(tenant.name, output_field=CharField()),
                ).prefetch_related(Prefetch('tags'))
                newsletters.extend(tenant_newsletters)
        
        sorted_newsletters = sorted(newsletters, key=lambda x: x.pub_date, reverse=True)
        context['newsletters'] = sorted_newsletters
        return context



class About(GetTenantsMixin, TemplateView):
    template_name = 'about.html'


class RedirectTenant(RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        domain = kwargs['domain']
        # Perform any necessary processing using the domain
        
        # Return the desired URL to redirect to
        return f"http://{domain}:8000/"

