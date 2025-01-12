from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # Specify the fields to display in the admin panel
    list_display = ('email', 'username', 'phone_number', 'is_staff', 'is_active')
    # Fields to filter in the sidebar
    list_filter = ('is_staff', 'is_active')
    # Fields to search in the admin
    search_fields = ('email', 'username', 'phone_number')
    ordering = ('email',)
    # Customizing the form for creating a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'phone_number', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )
    # Customizing the form for editing an existing user
    fieldsets = (
        (None, {'fields': ('email', 'username', 'phone_number', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

# Register the model and admin class
admin.site.register(CustomUser, CustomUserAdmin)
