from django.db import models
from django.contrib.auth.models import AbstractUser
from community.models import Community

class User(AbstractUser):
    tenant = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='users')