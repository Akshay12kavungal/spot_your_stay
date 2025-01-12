from django.contrib import admin

from properties.models import Property

# Register your models here.

admin.site.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'property_type', 'address', 'price', 'amenities', 'image', 'is_active', 'created_at')
    search_fields = ('name', 'description', 'property_type', 'address', 'amenities')
    list_filter = ('property_type', 'is_active')
