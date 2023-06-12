import logging
from django.shortcuts import render
from community.models import Community

# Create your views here.

class NavbarMixin:
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tenants'] = Community.objects.all()
        for tenant in context['tenants']:
            logging.info(tenant.get_domains()[0])
        return context