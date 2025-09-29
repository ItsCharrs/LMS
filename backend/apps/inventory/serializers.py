# apps/inventory/serializers.py

from rest_framework import serializers
from .models import Warehouse, Product, Stock


# WarehouseSerializer
class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = [
            "id",
            "name",
            "address",
            "city",
            "country",
            "created_at",
            "updated_at",
        ]


# ProductSerializer
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "sku", "name", "description", "weight_kg", "created_at"]


# StockSerilaizer
class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ["id", "product", "warehouse", "quantity", "updated_at"]
        depth = 1
