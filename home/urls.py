from django.urls import path
from home.views import Index, Login, Register
from django.contrib.auth.views import LogoutView


app_name = 'home'

urlpatterns = [
    path('', Index.as_view(), name='home'),
    path('login/', Login.as_view(), name='login'),
    path('register/', Register.as_view(), name='register'),
    path("logout/", LogoutView.as_view(), name="logout"),
]