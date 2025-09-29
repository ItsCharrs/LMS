# apps/orders/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from core.permissions import IsAdminOrManagerUser


class OrderViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing Orders.
    """

    queryset = Order.objects.all().prefetch_related("items").select_related("customer")
    serializer_class = OrderSerializer
    permission_classes = [IsAdminOrManagerUser]


class OrderItemViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing Order Items.
    """

    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAdminOrManagerUser]
