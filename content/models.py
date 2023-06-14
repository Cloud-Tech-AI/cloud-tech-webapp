from django.db import models

from mixins.models import UUIDMixin, TrailMixin
from community.models import Tag


class BasePost(UUIDMixin, TrailMixin, models.Model):
    title = models.CharField(max_length=200, null=False)
    pub_date = models.DateTimeField()
    sub_title = models.CharField(max_length=500, null=False)
    image = models.ImageField(upload_to='')
    tags = models.ManyToManyField(Tag)

    class Meta:
        abstract = True


class Blog(BasePost, models.Model):
    author = models.CharField(max_length=200)
    co_author = models.CharField(max_length=200)
    body = models.TextField(null=True, blank=True)
    # md_file = 


class NewsLetter(BasePost, models.Model):
    author = models.CharField(max_length=200)
    co_author = models.CharField(max_length=200)
    body = models.TextField(null=True, blank=True)
    # md_file = 


class Project(BasePost, models.Model):
    link = models.CharField(max_length=200)


class Monthly(BasePost, models.Model):
    link = models.CharField(max_length=200)
