import logging
from django.views.generic import TemplateView, RedirectView, ListView, DetailView
from content.models import Blog
from mixins.views import GetTenantsMixin


class Index(GetTenantsMixin, TemplateView):
    template_name = 'index.html'

class BlogsListView(GetTenantsMixin, ListView):
    model = Blog
    template_name = 'blogs.html'
    context_object_name = 'blogs'

    def get_context_data(self, **kwargs):
        logging.info('#'*20)
        sorted_blogs = Blog.objects.all().order_by('-pub_date')
        kwargs['blogs'] = sorted_blogs
        return super().get_context_data(**kwargs)

class BlogDetailView(GetTenantsMixin, DetailView):
    model = Blog
    template_name = 'blog_detail.html'
    context_object_name = 'blog'
    pk_url_kwarg = 'pk'


class NewsLetters(GetTenantsMixin, TemplateView):
    template_name = 'newsletters.html'


class Monthly(GetTenantsMixin, TemplateView):
    template_name = 'monthly.html'


class Projects(GetTenantsMixin, TemplateView):
    template_name = 'projects.html'


class About(GetTenantsMixin, TemplateView):
    template_name = 'about.html'


class RedirectTenant(RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        domain = kwargs['domain']
        # Perform any necessary processing using the domain
        
        # Return the desired URL to redirect to
        return f"http://{domain}:8000/"


# import tempfile

# from django.contrib.auth.mixins import LoginRequiredMixin
# from django.db import connection
# from django.db.models import Value
# from django.http import Http404, HttpResponse
# # Create your views here.
# from django.views import View
# from django.views.generic import ListView, TemplateView
# from django_filters.views import FilterView
# from django_tables2 import SingleTableMixin

# from autosift.helpers.internal_stats import get_file_process_time_stats
# from autosift.models import WorkOrder
# from organizations.models import Organization
# from organizations.views import IsSuperUserMixin
# from tracker.filters import TWorkOrderFilter
# from tracker.tables import TWorkOrderTable, TWorkOrderFileTable


# class SetTenantMixin(View):
#     def dispatch(self, request, *args, **kwargs):
#         organization_id = kwargs.get('org_id', None)
#         if not organization_id:
#             raise Http404
#         try:
#             organization = Organization.objects.get(id=organization_id)
#         except Organization.DoesNotExist:
#             raise Http404
#         request.tenant = organization
#         connection.set_tenant(request.tenant)
#         return super().dispatch(request, *args, **kwargs)


# class ListWorkOrders(LoginRequiredMixin, IsSuperUserMixin, SetTenantMixin, SingleTableMixin, FilterView):
#     table_class = TWorkOrderTable
#     template_name = 'tracker/work_orders/list.html'
#     filterset_class = TWorkOrderFilter

#     def get_queryset(self):
#         return WorkOrder.objects.all().annotate(organization_id=Value(self.request.tenant.id))

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['organization'] = self.request.tenant
#         filter_set = TWorkOrderFilter(self.request.GET, queryset=self.get_queryset())
#         context['filter'] = filter_set
#         context['count_total'] = filter_set.qs.count()
#         context['count_processed'] = filter_set.qs.filter(status=WorkOrder.S_PROCESSED).count()
#         context['count_processing'] = filter_set.qs.filter(status=WorkOrder.S_PROCESSING).count()
#         context['count_pending'] = filter_set.qs.filter(status=WorkOrder.S_PENDING).count()
#         context['count_errors'] = filter_set.qs.filter(status=WorkOrder.S_ERROR).count()
#         return context


# class ListWorkOrdersPartial(LoginRequiredMixin, IsSuperUserMixin, SetTenantMixin, SingleTableMixin, FilterView):
#     table_class = TWorkOrderTable
#     template_name = 'tracker/work_orders/list_partial.html'
#     filterset_class = TWorkOrderFilter

#     def get_queryset(self):
#         return WorkOrder.objects.all()

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         return context


# class WorkOrderDetail(LoginRequiredMixin, IsSuperUserMixin, SetTenantMixin, TemplateView):
#     template_name = 'tracker/work_orders/detail.html'

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['organization'] = self.request.tenant
#         work_order = WorkOrder.objects.get(id=kwargs.get('pk'))
#         context['work_order'] = work_order
#         wo_files = work_order.workorderfile_set.all()
#         files_table = TWorkOrderFileTable(wo_files)
#         context['files_table'] = files_table
#         context['num_files'] = wo_files.count()
#         return context


# class ExportProcessTimeStats(LoginRequiredMixin, IsSuperUserMixin, SetTenantMixin, View):
#     def get(self, request, *args, **kwargs):
#         stats = get_file_process_time_stats()
#         with tempfile.NamedTemporaryFile(suffix='.csv') as f:
#             stats.to_csv(f.name, index=False)
#             response = HttpResponse(f.read(), content_type='text/csv')
#             response['Content-Disposition'] = 'attachment; filename=process_time_stats.csv'
#             return response

