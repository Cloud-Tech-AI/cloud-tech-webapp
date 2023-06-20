from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

from mixins.models import UUIDMixin, TrailMixin
from community.models import Tag

User = get_user_model()

class BasePost(UUIDMixin, TrailMixin, models.Model):
    title = models.CharField(max_length=200, null=False, blank=False)
    pub_date = models.DateTimeField(null=True, blank=True)
    sub_title = models.CharField(max_length=500, null=False, blank=False)
    image = models.ImageField(upload_to='', null=False, blank=False)
    tags = models.ManyToManyField(Tag)

    def save(self, *args, **kwargs):
        if not self.pub_date:
            self.pub_date = timezone.now()
        super().save(*args, **kwargs)

    class Meta:
        abstract = True


class Blog(BasePost, models.Model):
    body = models.TextField(null=True, blank=True)
    co_author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


class NewsLetter(BasePost, models.Model):
    body = models.TextField(null=True,blank=True)
    co_author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


class Project(BasePost, models.Model):
    link = models.CharField(max_length=200, null=False, blank=False)
    image = models.ImageField(upload_to='', null=True, blank=True)


class Monthly(BasePost, models.Model):
    link = models.CharField(max_length=200, null=False, blank=False)
