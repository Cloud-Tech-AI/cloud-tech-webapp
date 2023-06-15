from django.urls import reverse_lazy
from django.views.generic import TemplateView, FormView
from django.contrib.auth.mixins import LoginRequiredMixin
from ..forms.profile import ProfileForm


class Index(LoginRequiredMixin, TemplateView):
    login_url = reverse_lazy('home:login')
    template_name = 'home/index.html'


class Profile(LoginRequiredMixin, ProfileForm, FormView):
    login_url = reverse_lazy('home:profile')
    template_name = 'home/profile.html'
    form_class = ProfileForm
    success_url = reverse_lazy('home:home')

    def form_valid(self, form):
        if form.is_valid():
            profile_pic = form.cleaned_data['profile_pic']
            linkedin = form.cleaned_data['linkedin']
            github = form.cleaned_data['github']
            twitter = form.cleaned_data['twitter']
            self.request.user.profile.profile_pic = profile_pic
            self.request.user.profile.linkedin = linkedin
            self.request.user.profile.github = github
            self.request.user.profile.twitter = twitter
            self.request.user.save()
            return super().form_valid(form)
        form.add_error(None, "Error validating the form")
        return self.form_invalid(form)
