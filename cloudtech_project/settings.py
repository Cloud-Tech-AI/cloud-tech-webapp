"""
Django settings for cloudtech_project project.

Generated by 'django-admin startproject' using Django 4.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import os
from pathlib import Path

import environ

env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-39yux8xnm4d$aqwc&9!wn_hxz%1ki=1rivuibwj$f38u0gl(5s'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition
HAS_MULTI_TYPE_TENANTS = True
MULTI_TYPE_DATABASE_FIELD = 'type'

TENANT_TYPES = {
    'public': {
        'URLCONF': 'cloudtech_project.urls_public',
        'APPS': [
            'django.contrib.admin',
            'django.contrib.auth',
            'django.contrib.contenttypes',
            'django.contrib.sessions',
            'django.contrib.messages',
            'django.contrib.staticfiles',
            'django_tenants',
            'django_filters',
            'django_celery_results',
            'web',
            'mixins',
            'community',
        ]
    },
    'content': {
        'URLCONF': 'cloudtech_project.urls',
        'APPS': [
            'django.contrib.admin',
            'django.contrib.contenttypes',
            'django.contrib.sessions',
            'django.contrib.messages',
            'django.contrib.staticfiles',
            'django_filters',
            'home',
            'content',
        ]
    }
}

INSTALLED_APPS = []
for schema in TENANT_TYPES:
    INSTALLED_APPS += [app for app in TENANT_TYPES[schema]["APPS"] if app not in INSTALLED_APPS]

TENANT_MODEL = 'community.Community'
TENANT_DOMAIN_MODEL = 'community.Domain'

TENANT_USERS_DOMAIN = env.str('TENANT_DOMAIN_NAME', default='*/localhost')
TENANT_BASE_URL = env.str('TENANT_BASE_URL', default='http://%s.localhost:8000')
PUBLIC_SCHEMA_NAME = env.str('PUBLIC_SCHEMA_NAME', default='public')
PUBLIC_SCHEMA_DOMAIN = env.str('PUBLIC_DOMAIN_NAME', default='localhost')

MIDDLEWARE = [
    'content.tenant_middleware.TenantMainMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'cloudtech_project.urls'
PUBLIC_SCHEMA_URLCONF = 'cloudtech_project.urls_public'

SHOW_PUBLIC_IF_NO_TENANT_FOUND = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cloudtech_project.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django_tenants.postgresql_backend',
        'NAME': 'ishan_tenant',
        'USER': 'ishan_tenant',
        'PASSWORD': 'Ishan@123',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

DATABASE_ROUTERS = (
    'django_tenants.routers.TenantSyncRouter',
)

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "staticfiles"),
]

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

MEDIA_URL = '/media/'
MEDIA_ROOT = env.str('MEDIA_ROOT', os.path.join(BASE_DIR, 'media'))

PUBLIC_URL = env.str('PUBLIC_URL', default='http://localhost:8000/')

CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'django-db'

EMAIL_BACKEND = env.str('EMAIL_BACKEND', default="django.core.mail.backends.console.EmailBackend")
DEFAULT_FROM_EMAIL = env.str('DEFAULT_FROM_EMAIL', default="ishan.modi24@gmail.com")
if EMAIL_BACKEND == 'django_ses.SESBackend':
    AWS_SES_REGION_NAME = os.environ.get("AWS_DEFAULT_REGION", "ap-south-1")
    AWS_SES_REGION_ENDPOINT = f"email.{AWS_SES_REGION_NAME}.amazonaws.com"