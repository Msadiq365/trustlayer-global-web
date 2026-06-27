FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements from the api folder (since Dockerfile is in root)
COPY api/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire api folder contents
COPY api/ .

EXPOSE 8000

CMD ["uvicorn", "main_sqlite:app", "--host", "0.0.0.0", "--port", "8000"]