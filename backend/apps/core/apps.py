from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"

def ready(self):
    from .firebase import initialize_firebase_admin
    initialize_firebase_admin()
