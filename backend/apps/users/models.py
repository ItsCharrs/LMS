import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        MANAGER = "MANAGER", "Manager"
        DRIVER = "DRIVER", "Driver"
        CUSTOMER = "CUSTOMER", "Customer"

    # --- ADDED CustomerType CLASS ---
    class CustomerType(models.TextChoices):
        ONE_TIME = 'ONE_TIME', 'One-Time'
        REGULAR = 'REGULAR', 'Regular'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CUSTOMER)

    # --- ADDED customer_type FIELD ---
    customer_type = models.CharField(
        max_length=20, 
        choices=CustomerType.choices, 
        default=CustomerType.ONE_TIME
    )

    def __str__(self):
        return self.username