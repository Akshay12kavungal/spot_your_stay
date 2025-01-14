from django.contrib import admin

# Register your models here.
from gallery.models import GalleryImage

admin.site.register(GalleryImage)

class GalleryAdmin(admin.ModelAdmin):
    list_display = ('property', 'image')
    search_fields = ('property__name',)
    list_filter = ('property',)
