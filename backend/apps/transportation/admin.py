# apps/transportation/admin.py

from django.contrib import admin
from .models import Vehicle, Driver, Shipment

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('license_plate', 'make', 'model', 'capacity_kg')
    search_fields = ('license_plate', 'make', 'model')

@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ('user', 'license_number', 'phone_number')
    search_fields = ('user__username', 'license_number')
    autocomplete_fields = ['user'] # Added for better UX

@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    # Use 'job' instead of 'order'
    list_display = ('id', 'job', 'driver', 'vehicle', 'status')
    
    list_filter = ('status',)
    
    # Update search fields to use 'job'
    search_fields = ('id', 'job__id', 'driver__user__username')
    
    # Add autocomplete for better UX when assigning relationships
    autocomplete_fields = ['job', 'driver', 'vehicle']