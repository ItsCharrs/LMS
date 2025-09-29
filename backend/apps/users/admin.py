# apps/users/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """
    This class defines the admin panel interface for our custom User model.
    By inheriting from UserAdmin, we get a powerful, secure, and feature-rich
    admin interface for managing users by default. We can customize it
    further here later if needed.
    """

    pass
