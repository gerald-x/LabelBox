# Check if Python is installed
if (-not (Get-Command python3 -ErrorAction SilentlyContinue)) {
    Write-Host "Python3 is not installed. Please install it and try again." -ForegroundColor Red
    exit
}

# Check if pip is installed
if (-not (Get-Command pip3 -ErrorAction SilentlyContinue)) {
    Write-Host "pip3 is not installed. Please install it and try again." -ForegroundColor Red
    exit
}

# Install required dependencies
if (Test-Path "requirements.txt") {
    Write-Host "Installing dependencies from requirements.txt..." -ForegroundColor Green
    pip3 install -r requirements.txt
} else {
    Write-Host "requirements.txt not found. Please ensure it exists in the current directory." -ForegroundColor Red
    exit
}

# Run database migrations
Write-Host "Running migrations..." -ForegroundColor Green
python3 manage.py migrate

# Create superuser
Write-Host "Creating superuser..." -ForegroundColor Green
Write-Host "You will be prompted to enter the superuser details."
python3 manage.py createsuperuser

# Run the Django development server
Write-Host "Starting the Django development server..." -ForegroundColor Green
python3 manage.py runserver
