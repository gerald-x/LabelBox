#!/bin/bash

# Check if Python is installed
if ! command -v python3 &> /dev/null
then
    echo "Python3 is not installed. Please install it and try again."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null
then
    echo "pip3 is not installed. Please install it and try again."
    exit 1
fi

# Install required dependencies
if [ -f "requirements.txt" ]; then
    echo "Installing dependencies from requirements.txt..."
    pip install -r requirements.txt
else
    echo "requirements.txt not found. Please ensure it exists in the current directory."
    exit 1
fi

# Run database migrations
echo "Running migrations..."
python manage.py migrate

# Create superuser
echo "Creating superuser..."
echo "You will be prompted to enter the superuser details."
python manage.py createsuperuser

# Run the Django development server
echo "Starting the Django development server..."
python manage.py runserver
