# apps/billing/models.py
from django.db import models
from core.models import BaseModel
from orders.models import Order


class Invoice(BaseModel):
    class InvoiceStatus(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        SENT = "SENT", "Sent"
        PAID = "PAID", "Paid"
        VOID = "VOID", "Void"

    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, related_name="invoice"
    )
    status = models.CharField(
        max_length=20, choices=InvoiceStatus.choices, default=InvoiceStatus.DRAFT
    )
    due_date = models.DateField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    # This will store the ID from Stripe (e.g., pi_.... for a Payment Intent)
    stripe_payment_intent_id = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Invoice {self.id} for Order {self.order.id}"
