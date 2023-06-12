from django.views.generic import TemplateView, RedirectView
from mixins.views import NavbarMixin


class Index(NavbarMixin, TemplateView):
    template_name = 'index.html'


class Blogs(TemplateView):
    template_name = 'blogs.html'


class NewsLetters(TemplateView):
    template_name = 'newsletters.html'


class Monthly(TemplateView):
    template_name = 'monthly.html'


class Projects(TemplateView):
    template_name = 'projects.html'


class About(TemplateView):
    template_name = 'about.html'


class RedirectTenant(RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        domain = kwargs['domain']
        # Perform any necessary processing using the domain
        
        # Return the desired URL to redirect to
        return f"http://{domain}:8000/"

