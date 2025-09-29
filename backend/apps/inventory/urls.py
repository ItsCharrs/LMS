# apps/inventory/urls.py

from rest_framework.routers import DefaultRouter
from .views import WarehouseViewSet, ProductViewSet, StockViewSet

router = DefaultRouter()
router.register(r"warehouses", WarehouseViewSet, basename="warehouse")
router.register(r"products", ProductViewSet, basename="product")
router.register(r"stock", StockViewSet, basename="stock")

urlpatterns = router.urls
