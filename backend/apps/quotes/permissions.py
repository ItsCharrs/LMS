# apps/quotes/permissions.py

from rest_framework.permissions import BasePermission

class IsAdminRole(BasePermission):
    """
    Permission class that checks if user has role='ADMIN'
    (unlike IsAdminUser which checks is_staff)
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == 'ADMIN'
        )
