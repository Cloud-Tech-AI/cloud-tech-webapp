from django import forms
from mixins.models import ProfileMixin

class ProfileForm(forms.Form):
    profile_pic = forms.ImageField(
        widget=forms.FileInput(
            attrs={
                "class": "form-control"
            }
        ))
    linkedin = forms.URLField(
        widget=forms.URLInput(
            attrs={
                "class": "form-control"
            }
        ))
    github = forms.URLField(
        widget=forms.URLInput(
            attrs={
                "class": "form-control"
            }
        ))
    twitter = forms.URLField(
        widget=forms.URLInput(
            attrs={
                "class": "form-control"
            }
        ))

    class meta:
        ProfileMixin
        fields = ('profile_pic', 'linkedin', 'github', 'twitter')