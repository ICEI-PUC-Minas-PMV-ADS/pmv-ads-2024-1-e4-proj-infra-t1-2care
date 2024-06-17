FROM python:3.12.3-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . /app/

# Expose the port the app runs on
EXPOSE 8137

# Command to run the application
CMD ["python", "manage.py", "runserver", "127.0.0.1:8137"]