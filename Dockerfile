FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy everything from the api folder to /app
COPY api/ /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Set working directory to /app (where main_sqlite.py is)
WORKDIR /app

EXPOSE 8000

CMD ["uvicorn", "main_sqlite:app", "--host", "0.0.0.0", "--port", "8000"]