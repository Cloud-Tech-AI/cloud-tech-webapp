from django.urls import path
from web.views import Index, TenantRedirect


app_name = 'web'

urlpatterns = [
    path('', Index.as_view(), name='web'),
    path('redirect/', TenantRedirect.as_view(), name='redirect'),
]