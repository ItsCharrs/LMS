# apps/orders/admin.py

from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    """
    Allows editing of OrderItems directly within the Order admin page.
    """

    model = OrderItem
    extra = 1  # Number of empty forms to show


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "status", "order_date")
    list_filter = ("status", "order_date")
    search_fields = ("id", "customer__username")
    inlines = [OrderItemInline]  # <-- This is the magic


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "quantity", "price_at_order")
    search_fields = ("order__id", "product__name")
