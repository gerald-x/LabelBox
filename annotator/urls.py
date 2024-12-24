from django.urls import path
from . import views 

urlpatterns = [
    path("", views.index, name="index"),
    path("processed-images/", views.edited_image, name="edited_images"),
]
