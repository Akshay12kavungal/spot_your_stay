from django.db import models
from django.conf import settings
from django.forms import ValidationError
from properties.models import Property
from django.contrib.auth.models import User

class Booking(models.Model):
    STATUS_CHOICES = [
        ('confirmed', 'Confirmed'),
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('canceled', 'Canceled'),
        ('bookings','Bookings'),
        ('visited','Visited'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bookings")
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='bookings')
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.PositiveIntegerField()
    advance_amount=models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return f'Booking {self.id} for {self.property.name} by {self.user.username}'




class BlockedDate(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="blocked_dates")
    start_date = models.DateField()
    end_date = models.DateField()

    def clean(self):
        if self.start_date > self.end_date:
            raise ValidationError("Start date cannot be after end date.")
        
        # Ensure no overlapping blocks
        if BlockedDate.objects.filter(
            property=self.property,
            start_date__lte=self.end_date,
            end_date__gte=self.start_date
        ).exists():
            raise ValidationError("This date range overlaps with an existing block.")

    def __str__(self):
        return f"Blocked: {self.start_date} to {self.end_date} for {self.property.name}"