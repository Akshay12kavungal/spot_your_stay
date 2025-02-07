from django.contrib import admin
from .models import ContactUs, Review, FAQ

# Register your models here.
admin.site.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'property', 'rating', 'comment', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('user__username', 'property__name')

admin.site.register(ContactUs)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'message', 'created_at')
    list_filter = ('created_at')
    search_fields = ('name', 'email')

admin.site.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'answer', 'created_at')
    list_filter = ('created_at')
    search_fields = ('question', 'answer')

