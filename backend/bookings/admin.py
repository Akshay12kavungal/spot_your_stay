from django.contrib import admin
from .models import BlockedDate, Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'property', 'check_in', 'check_out','advance_amount', 'total_amount', 'status')
    list_filter = ('status', 'check_in', 'check_out')
    search_fields = ('user__username', 'property__name')


@admin.register(BlockedDate)
class BlockedDateAdmin(admin.ModelAdmin):
    list_display = ("property", "start_date", "end_date")
    list_filter = ("property", "start_date", "end_date")
    search_fields = ("property__name",)