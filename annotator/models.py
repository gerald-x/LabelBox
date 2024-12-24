from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary_storage.storage import MediaCloudinaryStorage

# Create your models here.

class User(AbstractUser):
    pass

class ImageUploader(models.Model):
    name = models.CharField(max_length=100, null=False)
    image = models.ImageField(upload_to='images/', blank=False, storage=MediaCloudinaryStorage)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

class AnnotatedImage(models.Model):
    edited_image = models.ImageField(upload_to='images/', blank=False, storage=MediaCloudinaryStorage)
    reference = models.ForeignKey(ImageUploader, on_delete=models.PROTECT, null=False, blank=False)