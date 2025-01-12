from django.contrib import admin

from bookings.models import Booking

# Register your models here.

@admin.register(Booking)
class BookingsAdmin(admin.ModelAdmin):
    list_display = ('user', 'property', 'check_in', 'check_out', 'total_amount', 'status')
    search_fields = ('user__email', 'property__name')
    list_filter = ('status',)