from django.views.generic import TemplateView, RedirectView


class Index(TemplateView):
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

class TenantRedirect(RedirectView):
    def get_redirect_url(self, *args, **kwargs):

        return "http://member.localhost:8000/"
