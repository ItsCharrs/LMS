# apps/orders/admin.py

from django.contrib import admin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Job model.
    """
    list_display = (
        'id', 
        'customer', 
        'status', 
        'pickup_city', 
        'delivery_city', 
        'requested_pickup_date'
    )
    list_filter = ('status', 'requested_pickup_date')
    search_fields = (
        'id', 
        'customer__username', 
        'pickup_city', 
        'delivery_city', 
        'cargo_description'
    )
    
    # This makes the customer field a searchable dropdown instead of a giant list
    autocomplete_fields = ['customer']

    # Organize the detail view into sections
    fieldsets = (
        ('Job Overview', {
            'fields': ('customer', 'status', 'cargo_description', 'requested_pickup_date')
        }),
        ('Pickup Information', {
            'fields': ('pickup_address', 'pickup_city', 'pickup_contact_person', 'pickup_contact_phone')
        }),
        ('Delivery Information', {
            'fields': ('delivery_address', 'delivery_city', 'delivery_contact_person', 'delivery_contact_phone')
        }),
    )