#!/bin/sh
# entrypoint.sh

echo "Applying database migrations..."
python manage.py migrate

echo "Starting server..."
# Execute the command passed to this script (our Gunicorn command)
exec "$@"