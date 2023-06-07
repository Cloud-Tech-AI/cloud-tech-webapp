from django.urls import reverse_lazy
from django.views.generic import TemplateView, FormView, RedirectView
from .forms import LoginForm, SignUpForm


class Index(TemplateView):
    template_name = 'test.html'

class Login(FormView):
    template_name = 'accounts/login.html'
    form_class = LoginForm

    def get_success_url(self):
        # get tenant from the user
        return reverse_lazy('web:redirect')

class Register(FormView):
    template_name = 'accounts/register.html'
    form_class = SignUpForm

class TenantRedirect(RedirectView):
    def get_redirect_url(self, *args, **kwargs):

        return "http://member.localhost:8000/"
