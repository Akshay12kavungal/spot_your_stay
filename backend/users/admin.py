from django.contrib import admin
from .models import UserProfile

# Register your models here.
admin.site.register(UserProfile)    
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'address', 'profile_picture')



# your_app/admin.py
from django.contrib import admin

admin.site.site_header = "Spot Your Stay"
admin.site.site_title = "Spot Your Stay"
admin.site.index_title = "Welcome to Your Spot Your Stay Admin Portal"
