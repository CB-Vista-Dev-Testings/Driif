# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files for installing dependencies
COPY poetry.lock pyproject.toml /app/

# Install Poetry
RUN pip install poetry

# Install dependencies
RUN poetry install --no-root

# Copy the rest of the application code
COPY . /app

# Set environment to docker
ENV ENVIRONMENT=docker
ENV USE_KAFKA=true
ENV LOCAL_REDIS=false

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run app.py when the container launches
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
