from django.views.generic import TemplateView, RedirectView
from django.conf import settings
from mixins.views import GetTenantsMixin


class Index(GetTenantsMixin, TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["tenants"] = self.get_tenants()
        context["urls"] = settings.CLOUDTECH_URLS
        return context


class About(GetTenantsMixin, TemplateView):
    template_name = 'about.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tenants'] = self.get_tenants()
        return context


class RedirectTenant(RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        domain = kwargs['domain']
        # Perform any necessary processing using the domain

        # Return the desired URL to redirect to
        return f"http://{domain}:8000/"
