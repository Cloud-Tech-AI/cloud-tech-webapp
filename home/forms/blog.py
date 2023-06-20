from django import forms
from content.models import Blog
from community.models import Tag
from django.contrib.auth import get_user_model

User = get_user_model()


class BlogCreateForm(forms.ModelForm):
    title = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                "placeholder": "Title",
                "class": "form-control"
            }
        ))
    
    sub_title = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                "placeholder": "Sub Title",
                "class": "form-control"
            }
        ))
    
    image = forms.ImageField(
        required=True,
        widget=forms.FileInput(
            attrs={
                "class": "form-control"
            }
        ))
    
    body = forms.CharField(
        required=False,
        widget=forms.Textarea(
            attrs={
                "class": "form-control"
            }
        ))

    co_author = forms.ModelChoiceField(
        required=False,
        queryset=User.objects.filter(is_staff=False, is_superuser=False),
        empty_label="Select Co-Author",
        widget=forms.Select(
            attrs={
                "class": "form-control"
            }

        ))
    
    tags = forms.ModelMultipleChoiceField(
        required=True,
        queryset=Tag.objects.all(),
        widget=forms.SelectMultiple(
            attrs={
                "class": "form-control"
            }
        ))
    
    pub_date = forms.DateTimeField(
        required=False,
        widget=forms.DateTimeInput(
            attrs={
                "class": "form-control"
            }
        )
    )
    
    class Meta:
        model = Blog
        fields = ['title', 'sub_title','image', 'body', 'co_author', 'tags', 'pub_date']