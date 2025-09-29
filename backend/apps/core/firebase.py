# apps/core/firebase.py

import firebase_admin
from firebase_admin import credentials
import os # Make sure os is imported
from django.conf import settings # Make sure settings is imported

def initialize_firebase_admin():
    """
    Initializes the Firebase Admin SDK if it hasn't been initialized yet.
    Uses an absolute path to the credentials file to avoid CWD issues.
    """
    if not firebase_admin._apps:
        # Construct the absolute path to the credentials file
        cred_path = os.path.join(settings.BASE_DIR, settings.GOOGLE_APPLICATION_CREDENTIALS)

        if not os.path.exists(cred_path):
            raise FileNotFoundError(
                f"Firebase credentials file not found at absolute path: {cred_path}. "
                "Ensure the GOOGLE_APPLICATION_CREDENTIALS environment variable is set correctly "
                "and the file is mounted."
            )
        
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)