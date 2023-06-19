from markdown import markdown

from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from content.models import Monthly

class MonthlyListView(LoginRequiredMixin, ListView):
    model = Monthly
    template_name = 'home/monthly/monthly.html'
    context_object_name = 'monthly'
    ordering = ['created_at']


