from django.contrib import admin
from .models import ImageUploader, AnnotatedImage

# Register your models here.
admin.site.register(ImageUploader)
admin.site.register(AnnotatedImage)