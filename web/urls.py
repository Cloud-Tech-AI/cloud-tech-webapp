from django.urls import path
from web.views import Index


urlpatterns = [
    path('', Index.as_view(), name='web')
]