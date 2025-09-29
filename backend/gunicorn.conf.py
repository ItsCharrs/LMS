# gunicorn.conf.py

import django
from django.conf import settings

# This line is critical. It loads all of Django's settings,
# including the .env file, so they are available here.
django.setup()

def on_starting(server):
    """
    Master process hook, runs once when Gunicorn starts.
    We don't initialize Firebase here to avoid fork issues.
    """
    server.log.info("Gunicorn master process is starting.")

def post_fork(server, worker):
    """
    Worker process hook, runs in each worker after it has been forked.
    This is the safest place to initialize third-party SDKs.
    """
    # We import here to ensure the latest code is used in the worker.
    from apps.core.firebase import initialize_firebase_admin
    
    server.log.info(f"Worker {worker.pid} forked. Initializing Firebase Admin SDK.")
    initialize_firebase_admin()

# You can also add standard Gunicorn settings here
# workers = 4
# bind = "0.0.0.0:8000"