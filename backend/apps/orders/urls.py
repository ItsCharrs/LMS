# apps/orders/urls.py

from rest_framework.routers import DefaultRouter
from .views import JobViewSet

router = DefaultRouter()

# Register the new JobViewSet with the endpoint 'jobs'
# This will create URLs like /api/v1/jobs/ and /api/v1/jobs/{id}/
router.register(r'jobs', JobViewSet, basename='job')

urlpatterns = router.urls