# apps/transportation/admin.py

from django.contrib import admin
from .models import Vehicle, Driver, Shipment


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ("license_plate", "make", "model", "capacity_kg")
    search_fields = ("license_plate", "make", "model")


@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ("user", "license_number", "phone_number")
    search_fields = ("user__username", "license_number")


@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "driver", "vehicle", "status")
    list_filter = ("status",)
    search_fields = ("id", "order__id", "driver__user__username")
