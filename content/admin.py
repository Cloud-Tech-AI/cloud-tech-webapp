from django.contrib import admin
from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple
from .models import Blog, NewsLetter, Project, Monthly

class BlogAdminForm(forms.ModelForm):
    class Meta:
        model = Blog
        fields = '__all__'
        widgets = {
            'tags': FilteredSelectMultiple('Tags', False),
        }

class NewsLetterAdminForm(forms.ModelForm):
    class Meta:
        model = NewsLetter
        fields = '__all__'
        widgets = {
            'tags': FilteredSelectMultiple('Tags', False),
        }

class ProjectAdminForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = '__all__'
        widgets = {
            'tags': FilteredSelectMultiple('Tags', False),
        }

class MonthlyAdminForm(forms.ModelForm):
    class Meta:
        model = Monthly
        fields = '__all__'
        widgets = {
            'tags': FilteredSelectMultiple('Tags', False),
        }

class BlogAdmin(admin.ModelAdmin):
    form = BlogAdminForm

class NewsLetterAdmin(admin.ModelAdmin):
    form = NewsLetterAdminForm

class ProjectAdmin(admin.ModelAdmin):
    form = ProjectAdminForm

class MonthlyAdmin(admin.ModelAdmin):
    form = MonthlyAdminForm

admin.site.register(Blog, BlogAdmin)
admin.site.register(NewsLetter, NewsLetterAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Monthly, MonthlyAdmin)
