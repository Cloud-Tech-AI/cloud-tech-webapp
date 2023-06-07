from django.urls import path
from home.views import Index


app_name = 'home'

urlpatterns = [
    path('', Index.as_view(), name='home')
]