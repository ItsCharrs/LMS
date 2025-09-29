# apps/billing/admin.py

from django.contrib import admin
from .models import Invoice


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Invoice model.
    """

    list_display = ("id", "order", "status", "total_amount", "due_date", "created_at")
    list_filter = ("status", "due_date")
    search_fields = (
        "id",
        "order__id",
        "order__customer__username",
        "stripe_payment_intent_id",
    )
    readonly_fields = ("stripe_payment_intent_id", "created_at")

    # Allows for easy navigation back to the related order
    autocomplete_fields = ["order"]
