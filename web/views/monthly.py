    
from django.views.generic import ListView
from django_tenants.utils import tenant_context
from django.db.models import Value, CharField, Prefetch
from content.models import Monthly
from mixins.views import GetTenantsMixin

class MonthlyListView(GetTenantsMixin, ListView):
    model = Monthly
    template_name = 'monthly.html'

    def get_queryset(self, **kwargs):
        if 'tenant' in kwargs:
            tenant = kwargs['tenant']
            return Monthly.objects.all().annotate(
                tenant_name=Value(tenant.name, output_field=CharField()),
            ).prefetch_related(Prefetch('tags'))
        return super().get_queryset(**kwargs)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tenants'] = self.get_tenants()
        monthly = []
        for tenant in context['tenants']:
            with tenant_context(tenant):
                monthly.extend(list(self.get_queryset(tenant = tenant)))
        context['monthly'] = monthly
        return context
