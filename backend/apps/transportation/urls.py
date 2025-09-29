# apps/transportation/urls.py

from rest_framework.routers import DefaultRouter
from .views import VehicleViewSet, DriverViewSet, ShipmentViewSet

router = DefaultRouter()
router.register(r"vehicles", VehicleViewSet, basename="vehicle")
router.register(r"drivers", DriverViewSet, basename="driver")
router.register(r"shipments", ShipmentViewSet, basename="shipment")

urlpatterns = router.urls
