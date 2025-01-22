from django.contrib import admin
from .models import CustomUser

# Register your models here.
admin.site.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phone_number', 'is_staff')
    list_filter = ('is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'phone_number')


# your_app/admin.py
from django.contrib import admin

admin.site.site_header = "Spot Your Stay"
admin.site.site_title = "Spot Your Stay"
admin.site.index_title = "Welcome to Your Spot Your Stay Admin Portal"
