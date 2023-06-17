from django.contrib import admin
from django import forms
from .models import UserProfile
from django.contrib.admin.widgets import FilteredSelectMultiple


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = '__all__'
        widgets = {
            'tags': FilteredSelectMultiple('Tags', False),
        }

admin.site.register(UserProfile)