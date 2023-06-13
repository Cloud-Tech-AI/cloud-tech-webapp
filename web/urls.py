from django.urls import path
from web.views import Index, About, Blogs, NewsLetters, Monthly, Projects, RedirectTenant


app_name = 'web'

urlpatterns = [
    path('', Index.as_view(), name='web'),
    path('about/', About.as_view(), name='about'),
    path('blogs/', Blogs.as_view(), name='blogs'),
    path('newsletters/', NewsLetters.as_view(), name='newsletters'),
    path('monthly/', Monthly.as_view(), name='monthly'),
    path('projects/', Projects.as_view(), name='projects'),
    path('redirect/<str:domain>/', RedirectTenant.as_view(), name='redirect'),
]