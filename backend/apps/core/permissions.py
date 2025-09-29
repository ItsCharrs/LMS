# apps/core/permissions.py

from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminUser(BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "ADMIN"
        )


class IsManagerUser(BasePermission):
    """
    Allows access only to manager users.
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "MANAGER"
        )


class IsAdminOrManagerUser(BasePermission):
    """
    Allows access to admin or manager users.
    """

    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return bool(request.user.role in ["ADMIN", "MANAGER"])


class IsAdminOrReadOnly(BasePermission):
    """
    Allows read-only access for anyone, but only admins can write (create, update, delete).
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in SAFE_METHODS:
            return True

        # Write permissions are only allowed to the admin user.
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "ADMIN"
        )
