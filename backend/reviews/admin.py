from django.contrib import admin
from .models import Review

# Register your models here.
admin.site.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'property', 'rating', 'comment', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('user__username', 'property__name')
