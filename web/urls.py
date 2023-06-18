from django.urls import path
from web.views import Index, About, BlogsListView,BlogDetailView, NewsLettersListView, MonthlyListView, ProjectsListView, RedirectTenant


app_name = 'web'

urlpatterns = [
    path('', Index.as_view(), name='web'),
    path('about/', About.as_view(), name='about'),
    path('redirect/<str:domain>/', RedirectTenant.as_view(), name='redirect'),
]

urlpatterns += [
    path("blogs/", BlogsListView.as_view(), name="blogs"),
    path('blogs/view/<str:pk>/', BlogDetailView.as_view(), name='blog_detail'),
]

urlpatterns += [
    path("newsletters/", NewsLettersListView.as_view(), name="newsletters"),
    path('newsletters/view/<str:pk>/', BlogDetailView.as_view(), name='newsletter_detail'),
]

urlpatterns += [
    path('monthly/', MonthlyListView.as_view(), name='monthly'),
]

urlpatterns += [
    path('projects/', ProjectsListView.as_view(), name='projects'),
]
