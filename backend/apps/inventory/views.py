# apps/inventory/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Warehouse, Product, Stock
from .serializers import WarehouseSerializer, ProductSerializer, StockSerializer
from core.permissions import IsAdminOrManagerUser


# WarehouseViewSet
class WarehouseViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing warehouse instances.
    Provides `list`, `create`, `retrieve`, `update`,
    and `destroy` actions.
    """

    queryset = Warehouse.objects.all().order_by("-created_at")
    serializer_class = WarehouseSerializer
    permission_classes = [IsAdminOrManagerUser]


# ProductViewSet
class ProductViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing Product instances.
    """

    queryset = Product.objects.all().order_by("name")
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrManagerUser]


# StockViewSet
class StockViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing Stock instances.
    """

    queryset = Stock.objects.all().select_related("product", "warehouse")
    serializer_class = StockSerializer
    permission_classes = [IsAdminOrManagerUser]
