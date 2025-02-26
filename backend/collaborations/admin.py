from django.contrib import admin

# Register your models here.
from collaborations.models import CollaborationRequest

@admin.register(CollaborationRequest)
class CollaborationRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'message', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email')
