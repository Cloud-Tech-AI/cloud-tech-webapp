from django.urls import reverse_lazy
from django_tenants.utils import get_tenant
from django.views.generic import FormView
from django.contrib.auth import authenticate, login, get_user_model
from django.conf import settings
from ..forms.authentication import LoginForm, SignUpForm
from web.models import UserProfile


User = get_user_model()


class Login(FormView):
    template_name = 'accounts/login.html'
    form_class = LoginForm
    success_url = reverse_lazy('home:home')

    def get_context_data(self, **kwargs):
        context = super(Login, self).get_context_data()
        context['public_url'] = settings.PUBLIC_URL
        return context

    def form_valid(self, form):
        try:
            # Authenticate the user
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            tenant = get_tenant(self.request)
            # if not tenant in user.profile.tenants.all():
            #     raise Exception("Permission Denied")
            if user is not None:
                # Login the user
                login(self.request, user)
                return super().form_valid(form)
            else:
                form.add_error(None, "Invalid credentials")
        except Exception as e:
            form.add_error(None, str(e))
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
        user = User.objects.create_user(
            username=username, email=email, password=password)
        tenant = get_tenant(self.request)
        user_profile = UserProfile.objects.create(user=user)
        user_profile.tenants.set([tenant])
        
        return super().form_valid(form)
