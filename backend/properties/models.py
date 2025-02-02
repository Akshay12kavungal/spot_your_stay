from django.db import models


class Property(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    property_type = models.CharField(max_length=100)
    address = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    amenities = models.TextField()
    guests = models.IntegerField()
    rooms = models.IntegerField()
    bathrooms = models.IntegerField()
    bedrooms = models.IntegerField()
    image = models.ImageField(upload_to='property_images/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
