from markdown import markdown

from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from content.models import Monthly

class MonthlyListView(LoginRequiredMixin, ListView):
    model = Monthly
    template_name = 'home/monthly/monthly.html'
    context_object_name = 'monthly'

    def get_context_data(self, **kwargs):
        sorted_monthly = Monthly.objects.filter(created_by=self.request.user).order_by('created_at')
        kwargs['monthly'] = sorted_monthly
        return super().get_context_data(**kwargs)



