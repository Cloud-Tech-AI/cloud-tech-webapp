from markdown import markdown
from django.views.generic import ListView, DetailView
from django_tenants.utils import tenant_context
from django.db.models import Value, CharField, Prefetch
from content.models import NewsLetter
from community.models import Community
from mixins.views import GetTenantsMixin

class NewsLettersListView(GetTenantsMixin, ListView):
    model = NewsLetter
    template_name = 'newsletters.html'
    context_object_name = 'newsletters'

    def get_queryset(self):
        newsletters = []
        for tenant in self.get_tenants():
            with tenant_context(tenant):
                tenant_blogs = NewsLetter.objects.all().annotate(
                    tenant_name=Value(tenant.name, output_field=CharField()),
                ).prefetch_related(Prefetch('tags'))
                newsletters.extend(tenant_blogs)
        return newsletters
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tenants'] = self.get_tenants()
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
        markdown_text = self.object.body
        html_content = markdown(markdown_text)
        context['html_content'] = html_content
        return context