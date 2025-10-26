# logipro_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("logipro_backend.urls_api", namespace="api")),
    # Transportation app URLs will be available at /api/v1/transportation/
    path("api/v1/transportation/", include("apps.transportation.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)