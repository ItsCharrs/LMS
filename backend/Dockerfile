# 1. Use an official, lightweight Python image
FROM python:3.11-slim

# 2. Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV DJANGO_SETTINGS_MODULE=logipro_backend.settings

# 3. Set the working directory inside the container
WORKDIR /app

# 4. Copy and install dependencies
# We copy requirements.txt first to leverage Docker's layer caching.
# If requirements.txt doesn't change, Docker won't re-install dependencies on every build.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the application code into the container
COPY . .

# --- START OF NEW CHANGES ---

# COPY the entrypoint script into the container
COPY entrypoint.sh /app/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Set the ENTRYPOINT to our new script
ENTRYPOINT ["/app/entrypoint.sh"]

# --- END OF NEW CHANGES ---

# 6. Expose the port the app will run on
EXPOSE 8000

# 7. Define the command to run the application using the config file
# The CMD is now the command that gets passed to the entrypoint script
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--config", "gunicorn.conf.py", "logipro_backend.wsgi:application"]