import uuid

from django.db import models
from django.urls import reverse

from django_tenants.models import DomainMixin, TenantMixin
from django_tenants.utils import get_tenant_type_choices


class Community(TenantMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100, choices=get_tenant_type_choices(), default='content')

    add_project = models.BooleanField(default=False)
    add_discussion = models.BooleanField(default=False)
    add_blog = models.BooleanField(default=True)
    
    
    auto_create_schema = True
    auto_drop_schema = True

    def __str__(self):
        return self.name

    def get_domains(self):
        return self.domains.all().values_list('domain', flat=True)

    def get_absolute_url(self):
        return reverse('content:manage.general', kwargs={'pk': str(self.pk)})

    def get_update_url(self):
        return reverse('content:manage.general.edit', kwargs={'pk': str(self.pk)})

    def get_domain_str(self):
        return self.domains.first().domain


class Domain(DomainMixin):
    pass