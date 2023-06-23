from django.urls import reverse_lazy
from django.views.generic import TemplateView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
from ..forms.profile import ProfileForm
from web.models import UserProfile
from content.models import Blog, NewsLetter, Project, Monthly


class Index(LoginRequiredMixin, TemplateView):
    login_url = reverse_lazy('home:login')
    template_name = 'home/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        count = {}
        count['blogs'] = Blog.objects.filter(created_by=self.request.user).count()
        count['newsletters'] = NewsLetter.objects.filter(created_by=self.request.user).count()
        count['projects'] = Project.objects.filter(created_by=self.request.user).count()
        count['monthly'] = Monthly.objects.filter(created_by=self.request.user).count()
        context['count'] = count
        return context


class Profile(LoginRequiredMixin, UpdateView):
    login_url = reverse_lazy('home:login')
    model = UserProfile
    template_name = 'home/profile.html'
    form_class = ProfileForm
    success_url = reverse_lazy('home:home')
