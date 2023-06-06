from django.urls import reverse_lazy
from django.views.generic import TemplateView, FormView
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms.authentication import LoginForm


class Index(LoginRequiredMixin,TemplateView):
    login_url = 'login/'
    template_name = 'test.html'

class Login(FormView):
    template_name = 'accounts/login.html'
    form_class = LoginForm
    success_url = reverse_lazy('home')

class Register(TemplateView):
    template_name = 'accounts/register.html'
