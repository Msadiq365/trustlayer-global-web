FROM python:3.11-slim

WORKDIR /app

# Copy everything from api folder
COPY api/ /app/

# Install dependencies
RUN pip install -r requirements.txt

# Run the app
CMD ["uvicorn", "main_sqlite:app", "--host", "0.0.0.0", "--port", "8000"]