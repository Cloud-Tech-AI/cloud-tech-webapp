from django.db import models

# Create your models here.

class BasePost(models.Model):
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField()
    body = models.TextField()
    image = models.ImageField(upload_to = 'images/')


class Blog(BasePost, models.Model):
    author = models.CharField(max_length=200)
    is_newletter = models.BooleanField(default=False)


class Project(BasePost, models.Model):
    link = models.CharField(max_length=200)


class Discussions(BasePost, models.Model):
    link = models.CharField(max_length=200)


class Tag(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='tags')
    name = models.CharField(max_length=200)

    class Meta:
        unique_together = ('blog', 'name')
