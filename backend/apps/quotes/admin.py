from django.contrib import admin
from .models import QuoteCalculatorConfig


@admin.register(QuoteCalculatorConfig)
class QuoteCalculatorConfigAdmin(admin.ModelAdmin):
    list_display = ['id', 'base_rate_per_mile', 'minimum_charge', 'updated_at', 'updated_by']
    readonly_fields = ['updated_at']
    
    fieldsets = (
        ('Pricing Parameters', {
            'fields': ('base_rate_per_mile', 'weight_factor', 'minimum_charge')
        }),
        ('Service Multipliers', {
            'fields': ('service_multipliers',),
            'description': 'JSON format: {"RESIDENTIAL_MOVING": 1.5, "OFFICE_RELOCATION": 2.0, ...}'
        }),
        ('Metadata', {
            'fields': ('updated_at', 'updated_by')
        }),
    )
    
    def save_model(self, request, obj, form, change):
        obj.updated_by = request.user
        super().save_model(request, obj, form, change)
    
    def has_add_permission(self, request):
        # Only allow one configuration instance
        return not QuoteCalculatorConfig.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion of the configuration
        return False
