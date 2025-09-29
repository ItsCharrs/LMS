# apps/inventory/models.py

from django.db import models
from core.models import BaseModel


# Warehouse model
class Warehouse(BaseModel):
    """
    Represents a warehouse or storage facility.
    """

    name = models.CharField(max_length=255)
    address = models.TextField()
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.city})"


# Product model
class Product(BaseModel):
    """
    Represents a product that can be stored in a warehouse.
    """

    sku = models.CharField(max_length=100, unique=True, help_text="Stock Keeping Unit")
    name = models.CharField(max_length=255)
    description = models.TextField(
        blank=True
    )  # blank=True means this field is optional
    weight_kg = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    def __str__(self):
        return f"{self.name} (SKU: {self.sku})"


# Stock model
class Stock(BaseModel):
    """
    Represents the stock of a specific product in a specific warehouse.
    """

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="stock_levels"
    )
    warehouse = models.ForeignKey(
        Warehouse, on_delete=models.CASCADE, related_name="stock_levels"
    )
    quantity = models.PositiveIntegerField(default=0)

    class Meta:
        # Ensures that you cannot have duplicate stock entries for the same product in the same warehouse.
        unique_together = ("product", "warehouse")

    def __str__(self):
        return f"{self.quantity} of {self.product.sku} at {self.warehouse.name}"
