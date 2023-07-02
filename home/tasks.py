import logging
from django.conf import settings
from django.core.mail import send_mail
import urllib

from cloudtech_project.celery_app import app
from community.models import Community, Domain
from django.contrib.auth import get_user_model

User = get_user_model()

@app.task(name='admin_notification_email')
def admin_notification_email(community_id, username):
    community = Community.objects.get(id=community_id)
    user = User.objects.get(username=username)
    message = f"""
    <p>User Created !</p>
    <p>Name: {user.username}</p>
    <p>Email: {user.email}</p>
    <p>Tenant: {community.name}</p>
    """
    send_mail(subject=f"User Creation Notification",
              message=message,
              from_email=settings.DEFAULT_FROM_EMAIL,
              recipient_list=[settings.DEFAULT_FROM_EMAIL],
              html_message=message)
    
@app.task(name='user_notification_email')
def user_notification_email(community_id, username):
    community = Community.objects.get(id=community_id)
    user = User.objects.get(username=username)
    domain = Domain.objects.filter(tenant=community).first().domain
    domain_name = domain.split('.')[0]
    domain_url = settings.TENANT_BASE_URL.replace("%s", domain_name)
    login_url = urllib.parse.urljoin(domain_url, settings.LOGIN_URL)
    message = f"""
    <p>Hello {user.username},</p>
    <p>We are elated to welcome you to the CloudTech Community !</p>
    <p>Congratulations on successfully creating your account! We hope you will have a great experience engaging and collaborating with other members on CloudTech.</p>
    
    <p>Please login <a href="{login_url}">here</a> to access your account.</p>

    <p>Thanks,</p>    
    <p>CloudTech Community</p>
    """
    send_mail(subject=f"Welcome to CloudTech !",
              message=message,
              from_email=settings.DEFAULT_FROM_EMAIL,
              recipient_list=[settings.DEFAULT_FROM_EMAIL], # user.email
              html_message=message)
