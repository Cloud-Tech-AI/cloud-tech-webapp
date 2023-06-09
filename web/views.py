from django.views.generic import TemplateView, RedirectView


class Index(TemplateView):
    template_name = 'index.html'


class TenantRedirect(RedirectView):
    def get_redirect_url(self, *args, **kwargs):

        return "http://member.localhost:8000/"
