from django.views.generic import TemplateView, RedirectView
from mixins.views import NavbarMixin


class Index(NavbarMixin, TemplateView):
    template_name = 'index.html'


class Blogs(NavbarMixin, TemplateView):
    template_name = 'blogs.html'


class NewsLetters(NavbarMixin, TemplateView):
    template_name = 'newsletters.html'


class Monthly(NavbarMixin, TemplateView):
    template_name = 'monthly.html'


class Projects(NavbarMixin, TemplateView):
    template_name = 'projects.html'


class About(NavbarMixin, TemplateView):
    template_name = 'about.html'


class RedirectTenant(RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        domain = kwargs['domain']
        # Perform any necessary processing using the domain
        
        # Return the desired URL to redirect to
        return f"http://{domain}:8000/"

