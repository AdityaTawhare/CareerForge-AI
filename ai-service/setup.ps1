# CareerForge AI — AI Service Setup (PowerShell)
# Run from the ai-service directory:
#   cd "f:\CareerForge AI\ai-service"
#   .\setup.ps1

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  CareerForge AI — Setting up Python AI Service"            -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Check Python
try {
    $pyVersion = py --version 2>&1
    Write-Host "[OK] Found: $pyVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Python not found. Install from https://python.org" -ForegroundColor Red
    exit 1
}

# Create venv
Write-Host "[1/3] Creating virtual environment..."
py -m venv venv
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to create venv" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] venv created" -ForegroundColor Green

# Activate and install
Write-Host "[2/3] Installing dependencies..."
& ".\venv\Scripts\Activate.ps1"
pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] pip install failed" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Dependencies installed" -ForegroundColor Green

# Copy .env
Write-Host "[3/3] Copying .env file..."
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "[OK] .env created — fill in your API keys!" -ForegroundColor Yellow
} else {
    Write-Host "[OK] .env already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Setup complete! To start the AI service:"
Write-Host ""
Write-Host "    .\venv\Scripts\Activate.ps1"
Write-Host "    uvicorn app.main:app --reload --port 8000"
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
