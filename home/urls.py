from django.urls import path
from home.views.general import Index, Profile
from home.views.authentication import Login, Register
from home.views.blogs import BlogsListView, BlogDetailView, BlogCreateView, BlogUpdateView
from home.views.newsletters import NewsLettersListView, NewsLetterDetailView, NewsLetterCreateView, NewsLetterUpdateView
from home.views.projects import ProjectsListView
from home.views.monthly import MonthlyListView
from django.contrib.auth.views import LogoutView


app_name = 'home'

urlpatterns = [
    path('', Index.as_view(), name='home'),
    path('profile/<str:pk>/', Profile.as_view(), name='profile'),
]

urlpatterns += [
    path('login/', Login.as_view(), name='login'),
    path('register/', Register.as_view(), name='register'),
    path("logout/", LogoutView.as_view(next_page='/login'), name="logout"),
]


urlpatterns += [
    path("blogs/", BlogsListView.as_view(), name="blogs"),
    path('blogs/view/<str:pk>/', BlogDetailView.as_view(), name='blog_detail'),
    path('blogs/create/', BlogCreateView.as_view(), name='blog_create'),
    path('blogs/update/<str:pk>/', BlogUpdateView.as_view(), name='blog_update'),
]

urlpatterns += [
    path("newsletters/", NewsLettersListView.as_view(), name="newsletters"),
    path('newsletters/view/<str:pk>/', NewsLetterDetailView.as_view(), name='newsletter_detail'),
    path('newsletters/create/', NewsLetterCreateView.as_view(), name='newsletter_create'),
    path('newsletters/update/<str:pk>/', NewsLetterUpdateView.as_view(), name='newsletter_update'),
]

urlpatterns += [
    path("projects/", ProjectsListView.as_view(), name="projects"),
]

urlpatterns += [
    path("monthly/", MonthlyListView.as_view(), name="monthly"),
]