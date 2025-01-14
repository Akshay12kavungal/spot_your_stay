from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'property', 'check_in', 'check_out', 'total_amount', 'status')
    list_filter = ('status', 'check_in', 'check_out')
    search_fields = ('user__username', 'property__name')
