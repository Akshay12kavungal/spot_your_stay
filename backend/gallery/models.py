from django.db import models
from properties.models import Property

class GalleryImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='gallery_images/')

    def __str__(self):
        return f'{self.property.name} - Image'
