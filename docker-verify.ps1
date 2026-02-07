# Docker Setup Verification Script for JobPsych Frontend (PowerShell)
# This script checks if Docker is properly configured and working

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "JobPsych Docker Setup Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$ErrorCount = 0

function Test-CommandExists {
    param($Command)
    $null -ne (Get-Command $Command -ErrorAction SilentlyContinue)
}

function Write-Success {
    param($Message)
    Write-Host "✓ " -ForegroundColor Green -NoNewline
    Write-Host $Message
}

function Write-Error {
    param($Message)
    Write-Host "✗ " -ForegroundColor Red -NoNewline
    Write-Host $Message
}

function Write-Warning {
    param($Message)
    Write-Host "⚠ " -ForegroundColor Yellow -NoNewline
    Write-Host $Message
}

# Check Docker installation
Write-Host "Checking Docker installation... " -NoNewline
if (Test-CommandExists docker) {
    $dockerVersion = docker --version
    Write-Success $dockerVersion
} else {
    Write-Error "Docker is not installed"
    $ErrorCount++
}

# Check Docker Compose
Write-Host "Checking Docker Compose... " -NoNewline
try {
    $composeVersion = docker compose version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Success $composeVersion
    } else {
        Write-Error "Docker Compose is not available"
        $ErrorCount++
    }
} catch {
    Write-Error "Docker Compose is not available"
    $ErrorCount++
}

# Check Docker daemon
Write-Host "Checking Docker daemon... " -NoNewline
try {
    docker info | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Docker daemon is running"
    } else {
        Write-Error "Docker daemon is not running"
        $ErrorCount++
    }
} catch {
    Write-Error "Docker daemon is not running"
    $ErrorCount++
}

# Check disk space
Write-Host "Checking available disk space... " -NoNewline
try {
    $drive = Get-PSDrive -Name (Get-Location).Drive.Name
    $freeSpace = [math]::Round($drive.Free / 1GB, 2)
    Write-Success "Available: $freeSpace GB"
    if ($freeSpace -lt 2) {
        Write-Warning "Low disk space. At least 2GB recommended."
    }
} catch {
    Write-Warning "Unable to check disk space"
}

Write-Host ""
Write-Host "Checking project files..." -ForegroundColor Cyan
Write-Host ""

# Check Dockerfile
Write-Host "Checking Dockerfile... " -NoNewline
if (Test-Path "Dockerfile") {
    Write-Success "Dockerfile found"
} else {
    Write-Error "Dockerfile not found"
    $ErrorCount++
}

# Check docker-compose.yml
Write-Host "Checking docker-compose.yml... " -NoNewline
if (Test-Path "docker-compose.yml") {
    Write-Success "docker-compose.yml found"
} else {
    Write-Error "docker-compose.yml not found"
    $ErrorCount++
}

# Check nginx.conf
Write-Host "Checking nginx.conf... " -NoNewline
if (Test-Path "nginx.conf") {
    Write-Success "nginx.conf found"
} else {
    Write-Warning "nginx.conf not found (optional)"
}

# Check .dockerignore
Write-Host "Checking .dockerignore... " -NoNewline
if (Test-Path ".dockerignore") {
    Write-Success ".dockerignore found"
} else {
    Write-Warning ".dockerignore not found (recommended)"
}

# Validate docker-compose syntax
if ($ErrorCount -eq 0) {
    Write-Host ""
    Write-Host "Validating docker-compose.yml syntax... " -NoNewline
    try {
        $null = docker compose config 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Success "docker-compose.yml is valid"
        } else {
            Write-Error "docker-compose.yml has syntax errors"
            $ErrorCount++
        }
    } catch {
        Write-Error "docker-compose.yml validation failed"
        $ErrorCount++
    }
}

# Optional build tests
if ($ErrorCount -eq 0) {
    Write-Host ""
    $runTests = Read-Host "Run build tests? This may take a few minutes. (y/N)"
    
    if ($runTests -eq 'y' -or $runTests -eq 'Y') {
        Write-Host ""
        Write-Host "Testing production build..." -ForegroundColor Cyan
        Write-Host "Building production image... " -NoNewline
        
        $buildOutput = docker build --target production -t jobpsych-frontend:test-prod . 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Production build successful"
            
            # Get image size
            $imageInfo = docker images jobpsych-frontend:test-prod --format "{{.Size}}"
            Write-Host "  Image size: $imageInfo" -ForegroundColor Gray
            
            # Cleanup
            docker rmi jobpsych-frontend:test-prod | Out-Null
        } else {
            Write-Error "Production build failed"
            Write-Host $buildOutput -ForegroundColor Red
            $ErrorCount++
        }
        
        Write-Host ""
        Write-Host "Testing development build..." -ForegroundColor Cyan
        Write-Host "Building development image... " -NoNewline
        
        $buildOutput = docker build --target development -t jobpsych-frontend:test-dev . 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Development build successful"
            
            # Get image size
            $imageInfo = docker images jobpsych-frontend:test-dev --format "{{.Size}}"
            Write-Host "  Image size: $imageInfo" -ForegroundColor Gray
            
            # Cleanup
            docker rmi jobpsych-frontend:test-dev | Out-Null
        } else {
            Write-Error "Development build failed"
            Write-Host $buildOutput -ForegroundColor Red
            $ErrorCount++
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

if ($ErrorCount -eq 0) {
    Write-Host "✓ All checks passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your Docker setup is ready. Try these commands:" -ForegroundColor Cyan
    Write-Host "  docker-compose up jobpsych-prod -d   # Start production" -ForegroundColor Gray
    Write-Host "  docker-compose up jobpsych-dev       # Start development" -ForegroundColor Gray
    Write-Host "  make help                            # View all commands (requires make)" -ForegroundColor Gray
} else {
    Write-Host "✗ Found $ErrorCount error(s)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please fix the errors above before proceeding." -ForegroundColor Yellow
    exit 1
}

Write-Host "========================================" -ForegroundColor Cyan
