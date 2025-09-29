# apps/notifications/services.py

from twilio.rest import Client
from django.conf import settings
import logging

# Get an instance of a logger
logger = logging.getLogger(__name__)


def send_sms(to_number, body):
    """
    Sends an SMS message using Twilio.

    :param to_number: The recipient's phone number in E.164 format (e.g., +14155552671).
    :param body: The text of the message.
    :return: The message SID on success, None on failure.
    """
    if not all(
        [
            settings.TWILIO_ACCOUNT_SID,
            settings.TWILIO_AUTH_TOKEN,
            settings.TWILIO_PHONE_NUMBER,
        ]
    ):
        logger.error("Twilio settings are not configured. SMS not sent.")
        return None

    try:
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

        message = client.messages.create(
            body=body, from_=settings.TWILIO_PHONE_NUMBER, to=to_number
        )

        logger.info(f"SMS sent successfully to {to_number}. SID: {message.sid}")
        return message.sid
    except Exception as e:
        logger.error(f"Failed to send SMS to {to_number}: {e}")
        return None
