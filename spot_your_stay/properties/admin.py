from django.contrib import admin
from .models import Property

# Register your models here.

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'property_type', 'address', 'price', 'is_active')
    list_filter = ('property_type', 'is_active')
    search_fields = ('name', 'address')


