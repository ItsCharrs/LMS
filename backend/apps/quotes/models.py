from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal


class QuoteCalculatorConfig(models.Model):
    """
    Singleton model to store quote calculator configuration.
    Managers can update these values to control pricing.
    """
    base_rate_per_mile = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal('2.50'),
        validators=[MinValueValidator(Decimal('0.01'))],
        help_text="Base cost per mile"
    )
    
    service_multipliers = models.JSONField(
        default=dict,
        help_text="Service type multipliers in JSON format, e.g. {'RESIDENTIAL_MOVING': 1.5, 'OFFICE_RELOCATION': 2.0}"
    )
    
    weight_factor = models.DecimalField(
        max_digits=10,
        decimal_places=4,
        default=Decimal('0.0015'),
        validators=[MinValueValidator(Decimal('0.0001'))],
        help_text="Cost per pound of cargo"
    )
    
    minimum_charge = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal('50.00'),
        validators=[MinValueValidator(Decimal('1.00'))],
        help_text="Minimum quote amount"
    )
    
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='calculator_updates'
    )
    
    class Meta:
        verbose_name = "Quote Calculator Configuration"
        verbose_name_plural = "Quote Calculator Configuration"
    
    def __str__(self):
        return f"Calculator Config (Updated: {self.updated_at})"
    
    def save(self, *args, **kwargs):
        # Ensure only one config exists (singleton pattern)
        if not self.pk and QuoteCalculatorConfig.objects.exists():
            self.pk = QuoteCalculatorConfig.objects.first().pk
        super().save(*args, **kwargs)
    
    @classmethod
    def get_config(cls):
        """Get or create the singleton configuration"""
        config, _ = cls.objects.get_or_create(
            pk=1,
            defaults={
                'service_multipliers': {
                    'RESIDENTIAL_MOVING': 1.5,
                    'OFFICE_RELOCATION': 2.0,
                    'PALLET_DELIVERY': 1.2,
                    'SMALL_DELIVERIES': 1.0,
                }
            }
        )
        return config
