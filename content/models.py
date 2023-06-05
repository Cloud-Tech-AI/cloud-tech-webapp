import uuid
from django.db import models

from mixins.models import UUIDMixin, TrailMixin
from community.models import Tag


class BasePost(UUIDMixin, TrailMixin, models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField()
    body = models.TextField()
    image = models.ImageField(upload_to='images/')
    tags = models.ManyToManyField(Tag)


class Blog(BasePost, models.Model):
    author = models.CharField(max_length=200)
    is_newletter = models.BooleanField(default=False)


class Project(BasePost, models.Model):
    link = models.CharField(max_length=200)


class Discussion(BasePost, models.Model):
    link = models.CharField(max_length=200)
