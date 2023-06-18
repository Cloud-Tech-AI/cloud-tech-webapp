from markdown import markdown

from django.views.generic import ListView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from content.models import NewsLetter

class NewsLettersListView(LoginRequiredMixin, ListView):
    model = NewsLetter
    template_name = 'home/newsletters/newsletters.html'
    context_object_name = 'newsletters'
    ordering = ['created_at']


class NewsLetterDetailView(LoginRequiredMixin, DetailView):
    model = NewsLetter
    template_name = 'home/newsletters/newsletter_detail.html'
    context_object_name = 'newsletter'
    pk_url_kwarg = 'pk'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        markdown_text = self.object.body
        html_content = markdown(markdown_text)
        context['html_content'] = html_content
        return context


