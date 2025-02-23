from django.db import models
from bookings.models import Booking

class Payment(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=20, choices=[('completed', 'Completed'), ('failed', 'Failed')])

    def __str__(self):
        return f'Payment for Booking {self.booking.id}'
