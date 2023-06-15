from django.db import models
from django.contrib.auth import get_user_model

from mixins.models import UUIDMixin, TrailMixin
from community.models import Tag

User = get_user_model()

class BasePost(UUIDMixin, TrailMixin, models.Model):
    title = models.CharField(max_length=200, null=False)
    pub_date = models.DateTimeField(auto_now_add=True, null=False)
    sub_title = models.CharField(max_length=500, null=False)
    image = models.ImageField(upload_to='', null=False)
    tags = models.ManyToManyField(Tag, blank=False)

    class Meta:
        abstract = True


class Blog(BasePost, models.Model):
    body = models.TextField(null=True, blank=True)
    co_author = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)


class NewsLetter(BasePost, models.Model):
    body = models.TextField(null=True, blank=True)
    co_author = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)


class Project(BasePost, models.Model):
    link = models.CharField(max_length=200, null=False)


class Monthly(BasePost, models.Model):
    link = models.CharField(max_length=200, null=False)
