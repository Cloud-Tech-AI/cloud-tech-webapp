from django.views.generic import ListView
from django_tenants.utils import tenant_context
from django.db.models import Value, CharField, Prefetch
from content.models import Project
from mixins.views import GetTenantsMixin

class ProjectsListView(GetTenantsMixin, ListView):
    model = Project
    template_name = 'projects.html'
    context_object_name = 'projects'

    def get_queryset(self):
        projects = []
        for tenant in self.get_tenants():
            with tenant_context(tenant):
                tenant_blogs = Project.objects.all().annotate(
                    tenant_name=Value(tenant.name, output_field=CharField()),
                ).prefetch_related(Prefetch('tags'))
                projects.extend(tenant_blogs)
        return projects
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tenants'] = self.get_tenants()
        return context