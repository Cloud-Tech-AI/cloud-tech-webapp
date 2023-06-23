"""
Celery config file

https://docs.celeryproject.org/en/stable/django/first-steps-with-django.html

"""
from __future__ import absolute_import
import os
from celery import Celery

# This code is a copy of manage.py.
# Set the "celery Django" app's default Django settings module.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cloudtech_project.settings')

# you change the name here -Django Celery
# app = TenantAwareCeleryApp('cloudtech_project')
app = Celery("cloudtech_project")

# read configuration from Django settings, creating celery Django with the CELERY namespace
# config keys have the prefix "CELERY" Django Celery
app.config_from_object('django.conf:settings', namespace='CELERY')

# define queues to be used by email tasks
app.conf.task_queues = {
    'queue1': {
        'exchange': 'celery',
        'routing_key': 'queue1',
    },
    'queue2': {
        'exchange': 'celery',
        'routing_key': 'queue2',
    },
}

# load tasks.py in django apps - Django Celery
app.autodiscover_tasks()
