from django.db import models
from django.contrib.auth import get_user_model
from mixins.models import UUIDMixin
from community.models import Community

User = get_user_model()


class UserProfile(UUIDMixin, models.Model):
    author_name = models.CharField(max_length=200, null=False)
    profile_pic = models.ImageField(upload_to='', null=True, blank=True)
    linkedin = models.URLField(max_length=200, null=False, blank=False, default='')
    github = models.URLField(max_length=200, null=False, blank=False, default='')
    twitter = models.URLField(max_length=200, null=False, blank=False, default='')
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False, related_name='profile')
    tenants = models.ManyToManyField(Community, related_name='profile')

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        if not self.author_name:
            self.author_name = self.user.username
        super().save(*args, **kwargs)