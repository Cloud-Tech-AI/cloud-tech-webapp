    
from django.views.generic import ListView
from django_tenants.utils import tenant_context
from django.db.models import Value, CharField, Prefetch
from content.models import Monthly
from mixins.views import GetTenantsMixin

class MonthlyListView(GetTenantsMixin, ListView):
    model = Monthly
    template_name = 'monthly.html'
    context_object_name = 'monthly'

    def get_queryset(self):
        monthly = []
        for tenant in self.get_tenants():
            with tenant_context(tenant):
                tenant_blogs = Monthly.objects.all().annotate(
                    tenant_name=Value(tenant.name, output_field=CharField()),
                ).prefetch_related(Prefetch('tags'))
                monthly.extend(tenant_blogs)
        return monthly
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tenants'] = self.get_tenants()
        return context
