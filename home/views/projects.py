from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from content.models import Project


class ProjectsListView(LoginRequiredMixin, ListView):
    model = Project
    template_name = 'home/projects/projects.html'
    context_object_name = 'projects'
    ordering = ['-pub_date']


