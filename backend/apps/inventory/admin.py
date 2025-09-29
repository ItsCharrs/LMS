# apps/inventory/admin.py

from django.contrib import admin
from .models import Warehouse, Product, Stock


@admin.register(Warehouse)
class WarehouseAdmin(admin.ModelAdmin):
    list_display = ("name", "city", "country", "created_at")
    search_fields = ("name", "city", "country")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "sku", "weight_kg", "created_at")
    search_fields = ("name", "sku")


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ("product", "warehouse", "quantity", "updated_at")
    list_filter = ("warehouse",)
    search_fields = ("product__name", "product__sku", "warehouse__name")
