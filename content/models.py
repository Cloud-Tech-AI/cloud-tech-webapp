from django.db import models

from mixins.models import UUIDMixin, TrailMixin
from community.models import Tag


class BasePost(UUIDMixin, TrailMixin, models.Model):
    title = models.CharField(max_length=200, null=False)
    pub_date = models.DateTimeField(auto_now_add=True, null=False)
    sub_title = models.CharField(max_length=500, null=False)
    image = models.ImageField(upload_to='', null=False)
    tags = models.ManyToManyField(Tag, blank=False)

    class Meta:
        abstract = True


class Blog(BasePost, models.Model):
    author = models.CharField(max_length=200, null=False)
    co_author = models.CharField(max_length=200, null=True, blank=True)
    body = models.TextField(null=True, blank=True)


class NewsLetter(BasePost, models.Model):
    author = models.CharField(max_length=200, null=False)
    co_author = models.CharField(max_length=200, null=True, blank=True)
    body = models.TextField(null=True, blank=True)


class Project(BasePost, models.Model):
    link = models.CharField(max_length=200, null=False)


class Monthly(BasePost, models.Model):
    link = models.CharField(max_length=200, null=False)
