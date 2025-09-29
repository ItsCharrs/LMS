# apps/transportation/models.py

from django.db import models
from django.conf import settings
from core.models import BaseModel
from orders.models import Order


class Vehicle(BaseModel):
    """
    Represents a delivery vehicle.
    """

    license_plate = models.CharField(max_length=20, unique=True)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    capacity_kg = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.make} {self.model} ({self.license_plate})"


class Driver(BaseModel):
    """
    Represents a driver, linked to a user account.
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="driver_profile",
    )
    license_number = models.CharField(max_length=50, unique=True)
    phone_number = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.user.username


class Shipment(BaseModel):
    """
    Represents the shipment of an order.
    """

    class ShipmentStatus(models.TextChoices):
        PENDING = "PENDING", "Pending Assignment"
        IN_TRANSIT = "IN_TRANSIT", "In Transit"
        DELIVERED = "DELIVERED", "Delivered"
        FAILED = "FAILED", "Failed Delivery"

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="shipments")
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="shipments",
    )
    driver = models.ForeignKey(
        Driver,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="shipments",
    )
    status = models.CharField(
        max_length=20, choices=ShipmentStatus.choices, default=ShipmentStatus.PENDING
    )

    estimated_departure = models.DateTimeField(null=True, blank=True)
    actual_departure = models.DateTimeField(null=True, blank=True)
    estimated_arrival = models.DateTimeField(null=True, blank=True)
    actual_arrival = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Shipment for Order {self.order.id}"
