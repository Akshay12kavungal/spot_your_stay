# models.py
from django.db import models

class CollaborationRequest(models.Model):
    name = models.CharField(max_length=100)  # User's name
    email = models.EmailField(unique=True)  # User's email
    phone = models.CharField(max_length=15, blank=True, null=True,unique=True)  # User's phone number (optional)
    message = models.TextField()  # Collaboration message
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of submission

    def __str__(self):
        return f"Collaboration Request from {self.name} ({self.email})"