# LabelBox

An image annotation web application built on Django

# Django Setup Script

This repository contains scripts that automates the setup and running of a Django application. Follow the instructions below to ensure everything works smoothly.

## Prerequisites

1. **Python3**: Ensure Python3 is installed on your system. You can verify by running:

   ```bash
   python3 --version
   ```

2. **Pip3**: Ensure pip3 is installed. You can verify by running:

   ```bash
   pip3 --version
   ```

3. **Django Project**: Ensure you have the Django project set up with a `requirements.txt` file in the root directory.

## Script Usage

**Linux**:

1. Make the script executable:

   ```bash
   chmod +x setup_django.sh
   ```

2. Run the script:
   ```bash
   ./setup_django.sh
   ```

**Powershell**:

1. Run the script:
   ```bash
   ./setup_django.ps1
   ```

## What the Script Does

1. **Checks for Python3**: Verifies that Python3 is installed.
2. **Checks for Pip3**: Verifies that pip3 is installed.
3. **Installs Dependencies**: Installs all dependencies listed in `requirements.txt`.
4. **Runs Migrations**: Applies database migrations to set up the database schema.
5. **Creates a Superuser**: Prompts you to create a Django superuser account.
6. **Starts the Development Server**: Launches the Django development server on `http://127.0.0.1:8000/`.

## Guide for Manual Setup (Without the Script)

If you prefer to set up the Django application manually, follow these steps:

1. **Install Dependencies**:

   ```bash
   pip3 install -r requirements.txt
   ```

2. **Make Migrations**:

   ```bash
   python3 manage.py makemigrations
   ```

3. **Run Migrations**:

   ```bash
   python3 manage.py migrate
   ```

4. **Create a Superuser**:

   ```bash
   python3 manage.py createsuperuser
   ```

   Follow the prompts to enter the superuser's username, email, and password.

5. **Run the Development Server**:

   ```bash
   python3 manage.py runserver
   ```

   The server will start, and you can access your Django application at `http://127.0.0.1:8000/`.

## Notes

- Ensure you run the script or commands in the root directory of your Django project.
- If any step fails, follow the error message for troubleshooting.
- To stop the development server, press `Ctrl+C`.

This script simplifies the initial setup of your Django application, allowing you to focus on development and testing.
