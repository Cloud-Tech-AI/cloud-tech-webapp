import django_filters
from django.db import connection
from django.forms import widgets
from content.models import Blog, NewsLetter
from community.models import Community, Tag


class BlogFilter(django_filters.FilterSet):
    search_blog = django_filters.CharFilter(method='search_blog_filter',
                                       field_name='search_blog',
                                       widget=widgets.TextInput(attrs={
                                           'placeholder': 'Search by title...',
                                           'class': 'form-control form-control-sm',
                                            'style': 'width: 250px; height: 35px; box-shadow: none; border: 1px solid #ced4da;',
                                            'onfocus': "this.style.border='2px solid rgba(0, 123, 255, 0.8)';",
                                            'onblur': "this.style.border='1px solid #ced4da';",                
    }),
                                       label='Title')
    
    search_author = django_filters.CharFilter(method='search_author_filter',
                                       field_name='search_author',
                                       widget=widgets.TextInput(attrs={
                                           'placeholder': 'Search by author...',
                                           'class': 'form-control form-control-sm',
                                            'style': 'width: 250px; height: 35px; box-shadow: none;',
                                            'onfocus': "this.style.border='2px solid rgba(0, 123, 255, 0.8)';",
                                            'onblur': "this.style.border='1px solid #ced4da';",
                                       }),
                                       label='Author')
    
    tag = django_filters.ChoiceFilter(choices=[],
                                       field_name='tags__name',
                                       empty_label='Tag',
                                       widget=widgets.Select(attrs={
                                           'class': 'form-select form-select-sm',
                                           'style': 'width: 90px; height: 35px; box-shadow: none;',
                                            'onfocus': "this.style.border='2px solid rgba(0, 123, 255, 0.8)';",
                                            'onblur': "this.style.border='1px solid #ced4da';",
                                       }),
                                       label='Tag')
    
    tenant = django_filters.ChoiceFilter(choices=[],
                                         field_name='tenant_name',
                                         empty_label='Tier',
                                        widget=widgets.Select(attrs={
                                           'class': 'form-select form-select-sm',
                                           'style': 'width: 90px; height: 35px; box-shadow: none;',
                                            'onfocus': "this.style.border='2px solid rgba(0, 123, 255, 0.8)';",
                                            'onblur': "this.style.border='1px solid #ced4da';",
                                       }),
                                         label='Tier')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if connection.connection is not None:
            self.filters['tag'].extra['choices'] = [(tag.name, tag.name) for tag in Tag.objects.all()]
            self.filters['tenant'].extra['choices'] = [(community.name, community.name) for community in Community.objects.all()]
    
    def search_blog_filter(self, queryset, name, value):
        return queryset.filter(title__icontains=value)

    def search_author_filter(self, queryset, name, value):
        return queryset.filter(created_by__profile__author_name__icontains=value)

    class Meta:
        model = Blog
        fields = ('search_blog', 'search_author', 'tag', 'tenant')


class NewsLetterFilter(django_filters.FilterSet):
    search_newsletter = django_filters.CharFilter(method='search_newsletter_filter',
                                       field_name='search_newsletter',
                                       widget=widgets.TextInput(attrs={
                                           'placeholder': 'Search by title...',
                                           'class': 'form-control form-control-sm',
                                            'style': 'width: 250px; height: 35px; box-shadow: none; border: 1px solid #ced4da;',
                                            'onfocus': "this.style.border='2px solid rgba(0, 123, 255, 0.8)';",
                                            'onblur': "this.style.border='1px solid #ced4da';",                
    }),
                                       label='Title')
    
    search_author = django_filters.CharFilter(method='search_author_filter',
                                       field_name='search_author',
                                       widget=widgets.TextInput(attrs={
                                           'placeholder': 'Search by author...',
                                           'class': 'form-control form-control-sm',
                                            'style': 'width: 250px; height: 35px; box-shadow: none;',
                                            'onfocus': "this.style.border='2px solid rgba(0, 123, 255, 0.8)';",
                                            'onblur': "this.style.border='1px solid #ced4da';",
                                       }),
                                       label='Author')
    
    tag = django_filters.ChoiceFilter(choices=[],
                                       field_name='tags__name',
                                       empty_label='Tag',
                                       widget=widgets.Select(attrs={
                                           'class': 'form-select form-select-sm',
                                           'style': 'width: 90px; height: 35px; box-shadow: none;',
                                            'onfocus': "this.style.border='2px solid rgba(0, 123, 255, 0.8)';",
                                            'onblur': "this.style.border='1px solid #ced4da';",
                                       }),
                                       label='Tag')
    
    tenant = django_filters.ChoiceFilter(choices=[],
                                         field_name='tenant_name',
                                         empty_label='Tier',
                                        widget=widgets.Select(attrs={
                                           'class': 'form-select form-select-sm',
                                           'style': 'width: 90px; height: 35px; box-shadow: none;',
                                            'onfocus': "this.style.border='2px solid rgba(0, 123, 255, 0.8)';",
                                            'onblur': "this.style.border='1px solid #ced4da';",
                                       }),
                                         label='Tier')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if connection.connection is not None:
            self.filters['tag'].extra['choices'] = [(tag.name, tag.name) for tag in Tag.objects.all()]
            self.filters['tenant'].extra['choices'] = [(community.name, community.name) for community in Community.objects.all()]
    
    def search_newsletter_filter(self, queryset, name, value):
        return queryset.filter(title__icontains=value)

    def search_author_filter(self, queryset, name, value):
        return queryset.filter(created_by__profile__author_name__icontains=value)

    class Meta:
        model = NewsLetter
        fields = ('search_newsletter', 'search_author', 'tag', 'tenant')

