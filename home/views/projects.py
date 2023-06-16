from markdown import markdown

from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from content.models import Project

class ProjectsListView(LoginRequiredMixin, ListView):
    model = Project
    template_name = 'home/projects/projects.html'
    context_object_name = 'projects'

    def get_context_data(self, **kwargs):
        sorted_projects = Project.objects.filter(created_by=self.request.user).order_by('created_at')
        kwargs['projects'] = sorted_projects
        return super().get_context_data(**kwargs)



