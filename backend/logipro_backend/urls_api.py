# logipro_backend/urls_api.py

from django.urls import path
from core.views import health_check
from users.views import UserListView
from django.urls import path, include

# 1. Import the specific views from the simplejwt library
from users.views import UserListView, FirebaseLoginView, CurrentUserView, CreateUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


app_name = "api"

urlpatterns = [
    # Core URLs
    path("health-check/", health_check, name="health-check"),
    # Auth URLs
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # Add the new firebase auth URL
    path("auth/firebase/", FirebaseLoginView.as_view(), name="firebase_login"),
    # Users URLs
    path("users/", UserListView.as_view(), name="user-list"),
     path('users/create/', CreateUserView.as_view(), name='user-create'),
    # Add the new 'me' user URL
    path("users/me/", CurrentUserView.as_view(), name="user-me"),
    # Order URLs
    path("", include("orders.urls")),
    # Transportation URLs
    path("", include("transportation.urls")),
    # Billing URLs
    path("billing/", include("billing.urls")),
    # Notifications URLs
    path("notifications/", include("notifications.urls")),
    # Reports URLs
    path("reports/", include("reports.urls")),
]
