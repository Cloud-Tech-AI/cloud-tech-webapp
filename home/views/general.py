from django.urls import reverse_lazy
from django.views.generic import TemplateView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin
from ..forms.profile import ProfileForm
from ..models import ProfileMixin
import logging


class Index(LoginRequiredMixin, TemplateView):
    login_url = reverse_lazy('home:login')
    template_name = 'home/index.html'


class Profile(LoginRequiredMixin, UpdateView):
    login_url = reverse_lazy('home:login')
    model = ProfileMixin
    template_name = 'home/profile.html'
    form_class = ProfileForm
    success_url = reverse_lazy('home:home')

    def form_valid(self, form):
        if form.is_valid():
            author_name = form.cleaned_data['author_name']
            profile_pic = form.cleaned_data['profile_pic']
            linkedin = form.cleaned_data['linkedin']
            github = form.cleaned_data['github']
            twitter = form.cleaned_data['twitter']
            self.request.user.profile.author_name = author_name
            self.request.user.profile.profile_pic = profile_pic
            self.request.user.profile.linkedin = linkedin
            self.request.user.profile.github = github
            self.request.user.profile.twitter = twitter
            self.request.user.profile.save()
            return super().form_valid(form)
        form.add_error(None, "Error validating the form")
        return self.form_invalid(form)
