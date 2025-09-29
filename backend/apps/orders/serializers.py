# apps/orders/serializers.py

from rest_framework import serializers
from inventory.serializers import ProductSerializer
from users.serializers import UserSerializer
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "price_at_order"]


class OrderSerializer(serializers.ModelSerializer):
    # Use the OrderItemSerializer to represent the nested 'items'
    items = OrderItemSerializer(many=True, read_only=True)

    # Use UserSerializer for the customer, but make it read-only on display
    customer = UserSerializer(read_only=True)

    # We also need a writeable field to specify the customer when creating an order
    customer_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Order
        fields = ["id", "customer", "customer_id", "status", "order_date", "items"]
        read_only_fields = ["status", "order_date"]

    def create(self, validated_data):
        # Pop the customer_id from the data and create the order
        customer_id = validated_data.pop("customer_id")
        order = Order.objects.create(customer_id=customer_id, **validated_data)
        return order
