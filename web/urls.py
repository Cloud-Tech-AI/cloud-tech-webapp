from django.urls import path
from web.views import Index, Login, Register, TenantRedirect
from django.contrib.auth.views import LogoutView


app_name = 'web'

urlpatterns = [
    path('', Index.as_view(), name='web'),
    path('login/', Login.as_view(), name='login'),
    path('register/', Register.as_view(), name='register'),
    path("logout/", LogoutView.as_view(), name="logout"),
    path('redirect/', TenantRedirect.as_view(), name='redirect'),
]