from markdown import markdown

from django.urls import reverse_lazy
from django.views.generic import DetailView, CreateView, UpdateView
from django_filters.views import FilterView
from django.contrib.auth.mixins import LoginRequiredMixin
from content.models import NewsLetter
from web.filter import NewsLetterFilter
from ..forms.newsletter import NewsLetterCreateForm
from mixins.models import IsValidUserMixin

class NewsLettersListView(LoginRequiredMixin, FilterView):
    model = NewsLetter
    filterset_class = NewsLetterFilter
    template_name = 'home/newsletters/newsletters.html'
    context_object_name = 'newsletters'
    ordering = ['-pub_date']

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(created_by=self.request.user)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filter'] = self.filterset_class
        return context


class NewsLetterDetailView(LoginRequiredMixin, IsValidUserMixin, DetailView):
    model = NewsLetter
    template_name = 'home/newsletters/newsletter_detail.html'
    context_object_name = 'newsletter'
    pk_url_kwarg = 'pk'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['previous_page'] = self.request.META.get('HTTP_REFERER')
        markdown_text = self.object.body
        html_content = markdown(markdown_text)
        context['html_content'] = html_content
        return context
    

class NewsLetterCreateView(LoginRequiredMixin, CreateView):
    model = NewsLetter
    template_name = 'home/newsletters/newsletter_create.html'
    form_class = NewsLetterCreateForm
    success_url = reverse_lazy('home:newsletters')

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        return super().form_valid(form)


class NewsLetterUpdateView(LoginRequiredMixin, IsValidUserMixin, UpdateView):
    model = NewsLetter
    template_name = 'home/newsletters/newsletter_update.html'
    form_class = NewsLetterCreateForm
    success_url = reverse_lazy('home:newsletters')
    pk_url_kwarg = 'pk'

    def form_valid(self, form):
        form.instance.updated_by = self.request.user
        return super().form_valid(form)


