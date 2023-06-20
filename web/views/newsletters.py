import logging
from markdown import markdown
from django.views.generic import ListView, DetailView
from django_tenants.utils import tenant_context
from django.db.models import Value, CharField, Prefetch
from content.models import NewsLetter
from community.models import Community
from mixins.views import GetTenantsMixin
from ..filter import NewsLetterFilter

class NewsLettersListView(GetTenantsMixin, ListView):
    model = NewsLetter
    filterset_class = NewsLetterFilter
    template_name = 'newsletters.html'
    ordering = ['-pub_date']

    def get_queryset(self, **kwargs):
        if 'tenant' in kwargs:
            tenant = kwargs['tenant']
            return NewsLetter.objects.all().annotate(
                tenant_name=Value(tenant.name, output_field=CharField()),
            ).prefetch_related(Prefetch('tags'))
        return super().get_queryset(**kwargs)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tenants'] = self.get_tenants()
        newsletters = []
        for tenant in context['tenants']:
            with tenant_context(tenant):
                filtered_newletters = self.filterset_class(self.request.GET, queryset=self.get_queryset(tenant = tenant))
                newsletters.extend(list(filtered_newletters.qs))
        context['newsletters'] = newsletters
        context['filter'] = self.filterset_class
        return context


class NewsLetterDetailView(GetTenantsMixin, DetailView):
    model = NewsLetter
    template_name = 'detailed/newletter_detail.html'
    context_object_name = 'newletter'

    def get_object(self):
        tenant = Community.objects.get(name=self.kwargs['tenant'])
        with tenant_context(tenant):
            tenant_newsletters = NewsLetter.objects.all().prefetch_related(Prefetch('tags'))
            return tenant_newsletters.get(pk=self.kwargs['pk'])
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tenants'] = self.get_tenants()
        markdown_text = self.object.body
        html_content = markdown(markdown_text)
        context['html_content'] = html_content
        return context