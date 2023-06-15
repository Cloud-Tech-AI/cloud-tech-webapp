import logging
from django.views.generic import TemplateView, RedirectView, ListView, DetailView
from content.models import Blog
from mixins.views import NavbarMixin


class Index(NavbarMixin, TemplateView):
    template_name = 'index.html'

class BlogsListView(NavbarMixin, ListView):
    model = Blog
    template_name = 'blogs.html'
    context_object_name = 'blogs'

    def get_context_data(self, **kwargs):
        logging.info('#'*20)
        sorted_blogs = Blog.objects.all().order_by('-pub_date')
        kwargs['blogs'] = sorted_blogs
        return super().get_context_data(**kwargs)

class BlogDetailView(NavbarMixin, DetailView):
    model = Blog
    template_name = 'blog_detail.html'
    context_object_name = 'blog'
    pk_url_kwarg = 'pk'


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

