from urllib.parse import urlparse
import logging

from django_tenants.utils import get_tenant_model, get_tenant_type_choices,get_public_schema_name, get_tenant
from community.models import Community


class GetTenantsMixin:
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tenants'] = Community.objects.all()
        return context
