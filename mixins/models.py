import uuid

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import UUIDField

User = get_user_model()


class UUIDMixin(models.Model):
    id = UUIDField(primary_key=True, editable=False, default=uuid.uuid4)

    class Meta:
        abstract = True


class UserMixin(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                   related_name='%(class)s_created_by')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                   related_name='%(class)s_updated_by')

    class Meta:
        abstract = True

    def can_access(self, user):
        return self.created_by == user or self.updated_by == user


class TimestampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class TrailMixin(TimestampMixin, UserMixin):
    class Meta:
        abstract = True
