from django.urls import reverse_lazy
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class Index(LoginRequiredMixin,TemplateView):
    login_url = reverse_lazy('web:login')
    template_name = 'test.html'

