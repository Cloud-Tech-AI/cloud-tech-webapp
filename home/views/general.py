from django.urls import reverse_lazy
from django.views.generic import TemplateView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
from ..forms.profile import ProfileForm
from web.models import UserProfile


class Index(LoginRequiredMixin, TemplateView):
    login_url = reverse_lazy('home:login')
    template_name = 'home/index.html'


class Profile(LoginRequiredMixin, UpdateView):
    login_url = reverse_lazy('home:login')
    model = UserProfile
    template_name = 'home/profile.html'
    form_class = ProfileForm
    success_url = reverse_lazy('home:home')
