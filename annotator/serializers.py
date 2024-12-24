from rest_framework import serializers
from .models import AnnotatedImage

class AnnotatedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnotatedImage
        fields = "__all__"
