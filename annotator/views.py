from django.shortcuts import render
from .models import ImageUploader, AnnotatedImage
import base64
from django.core.files.base import ContentFile
from django.http.response import JsonResponse
from django.core import serializers
from .serializers import AnnotatedImageSerializer

# Create your views here.
def index(request):
    if request.method == "GET":
        images = ImageUploader.objects.all()
        return render(request, "annotator/index.html", {
            'images': images
        })
    
def edited_image(request):
    if request.method == "POST":
        reference_id = request.POST.get("reference_id")
        annotated_image = request.POST.get("annotatedImage")
        already_annotated = request.POST.get("reference")
        print("yes" if already_annotated else "no", already_annotated, reference_id)

        if already_annotated != "false":
            print("yes" if already_annotated else "no", already_annotated)
            already_annotated_image = AnnotatedImage.objects.get(id=int(reference_id))
            image_data = base64.urlsafe_b64decode(annotated_image)
            already_annotated_image.edited_image = ContentFile(content=image_data, name="uploaded-image.png")
            already_annotated_image.save()

            return JsonResponse({"msg": "Saved Successfully"})

        image_data = base64.urlsafe_b64decode(annotated_image)
        image_file = ContentFile(content=image_data, name="uploaded-image.png")

        processed_image = AnnotatedImage(
            edited_image=image_file,
            reference=ImageUploader.objects.get(id=int(reference_id))
        )
        processed_image.save()
        return JsonResponse({"msg": "Saved Successfully"})
    elif request.method == "GET":
        # serialized_annotated_images = serializers.serialize("json", AnnotatedImage.objects.all())
        serialized_annotated_images = AnnotatedImageSerializer(AnnotatedImage.objects.all(), many=True)
        return JsonResponse({
            "data": serialized_annotated_images.data
        })
