from django.db import models

class Amenity(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Property(models.Model):
    PROPERTY_TYPES = [
        ('farmhouse', 'Farmhouse'),
        ('cottage', 'Cottage'),
        ('resort','Resort'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
    address = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    amenities = models.ManyToManyField(Amenity, related_name="properties")
    image = models.ImageField(upload_to='property_images/')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
