from django import forms
from ..models import ProfileMixin
from django.contrib.auth import get_user_model

User = get_user_model()

class ProfileForm(forms.ModelForm):
    author_name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                "placeholder": User.username,
                "class": "form-control"
            }
        ))
    profile_pic = forms.ImageField(
        widget=forms.FileInput(
            attrs={
                "class": "form-control"
            }
        ))
    linkedin = forms.URLField(
        widget=forms.URLInput(
            attrs={
                "placeholder": "LinkedIn",
                "class": "form-control"
            }
        ))
    github = forms.URLField(
        widget=forms.URLInput(
            attrs={
                "placeholder": "Github",
                "class": "form-control"
            }
        ))
    twitter = forms.URLField(
        widget=forms.URLInput(
            attrs={
                "placeholder": "Twitter",
                "class": "form-control"
            }
        ))

    class Meta:
        model = ProfileMixin
        fields = ('author_name', 'profile_pic', 'linkedin', 'github', 'twitter')