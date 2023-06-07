import logging
from django.urls import reverse_lazy
from django.views.generic import TemplateView, FormView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login, get_user_model
from .forms.authentication import LoginForm, SignUpForm


User = get_user_model()


class Index(LoginRequiredMixin,TemplateView):
    login_url = reverse_lazy('home:login')
    template_name = 'home/index.html'

class Login(FormView):
    template_name = 'accounts/login.html'
    form_class = LoginForm
    success_url = reverse_lazy('home:home')

    def form_valid(self, form):
        # Authenticate the user
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            # Login the user
            login(self.request, user)
            return super().form_valid(form)
        else:
            form.add_error(None, "Invalid username or password")
            return self.form_invalid(form)


class Register(FormView):
    template_name = 'accounts/register.html'
    form_class = SignUpForm
    success_url = reverse_lazy('home:login')

    def form_valid(self, form):
        # Create the user object
        username = form.cleaned_data['username']
        email = form.cleaned_data['email']
        password = form.cleaned_data['password1']

        # Create the User object
        user = User.objects.create_user(username=username, email=email, password=password)
        return super().form_valid(form)

