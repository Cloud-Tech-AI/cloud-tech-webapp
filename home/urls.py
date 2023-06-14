from django.urls import path
from home.views.general import Index
from home.views.auth import Login, Register
from home.views.blogs import BlogsListView, BlogDetailView
from django.contrib.auth.views import LogoutView


app_name = 'home'

urlpatterns = [
    path('', Index.as_view(), name='home'),

]

urlpatterns += [
    path('login/', Login.as_view(), name='login'),
    path('register/', Register.as_view(), name='register'),
    path("logout/", LogoutView.as_view(next_page='/login'), name="logout"),
]


urlpatterns += [
    path("blogs/", BlogsListView.as_view(), name="blogs"),
    path('blogs/view/<str:pk>/', BlogDetailView.as_view(), name='blog_detail'),
]
