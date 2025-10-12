# Final Quality Assurance Test Suite - PowerShell
# Runs all tests and generates comprehensive report

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "JobPsych Frontend - Final QA Test Suite" -ForegroundColor Cyan
Write-Host "Started: $(Get-Date)" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Test results
$TotalTests = 0
$PassedTests = 0
$FailedTests = 0
$TestResults = @()

# Function to run a test and track results
function Run-Test {
    param(
        [string]$TestName,
        [string]$TestCommand
    )
    
    Write-Host "----------------------------------------" -ForegroundColor White
    Write-Host "Running: $TestName" -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor White
    
    $startTime = Get-Date
    
    try {
        Invoke-Expression $TestCommand
        $exitCode = $LASTEXITCODE
        
        if ($exitCode -eq 0) {
            Write-Host "✓ $TestName PASSED" -ForegroundColor Green
            $script:PassedTests++
            $status = "PASSED"
        } else {
            Write-Host "✗ $TestName FAILED" -ForegroundColor Red
            $script:FailedTests++
            $status = "FAILED"
        }
    } catch {
        Write-Host "✗ $TestName FAILED (Exception: $_)" -ForegroundColor Red
        $script:FailedTests++
        $status = "FAILED"
    }
    
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds
    
    $script:TotalTests++
    $script:TestResults += @{
        Name = $TestName
        Status = $status
        Duration = $duration
    }
    
    Write-Host ""
}

# Phase 1: Unit and Integration Tests
Write-Host "Phase 1: Unit and Integration Tests" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Run-Test "Unit Tests" "npm run test -- --run --reporter=basic"
Run-Test "Integration Tests" "npm run test:integration"

Write-Host ""
Write-Host "Phase 2: End-to-End Tests" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Run-Test "E2E Smoke Tests" "npm run test:e2e -- smoke.spec.js"
Run-Test "E2E User Journeys" "npm run test:e2e -- user-journeys.spec.js"
Run-Test "E2E Landing Page" "npm run test:e2e -- landing-page.spec.js"

Write-Host ""
Write-Host "Phase 3: Stress Testing" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Run-Test "Stress Tests" "npm run test:e2e -- stress-test.spec.js --workers=1"

Write-Host ""
Write-Host "Phase 4: Memory Leak Detection" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Run-Test "Memory Leak Tests" "npm run test:e2e -- memory-leak-test.spec.js --workers=1"

Write-Host ""
Write-Host "Phase 5: Code Quality" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Run-Test "ESLint Check" "npm run lint"
Run-Test "Build Verification" "npm run build"

Write-Host ""
Write-Host "Phase 6: Performance Tests" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "⚠ Load tests skipped (requires running dev server)" -ForegroundColor Yellow
Write-Host "To run load tests manually:" -ForegroundColor Yellow
Write-Host "  1. Start dev server: npm run dev" -ForegroundColor Yellow
Write-Host "  2. Run: cd loadtest && npm run test:load" -ForegroundColor Yellow
Write-Host ""

# Generate summary report
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Final QA Test Suite Summary" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Total Tests: $TotalTests" -ForegroundColor White
Write-Host "Passed: $PassedTests" -ForegroundColor Green
Write-Host "Failed: $FailedTests" -ForegroundColor Red

if ($TotalTests -gt 0) {
    $successRate = [math]::Round(($PassedTests / $TotalTests) * 100, 2)
    Write-Host "Success Rate: $successRate%" -ForegroundColor White
}

Write-Host ""
Write-Host "Completed: $(Get-Date)" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Create JSON report
$report = @{
    timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    summary = @{
        total = $TotalTests
        passed = $PassedTests
        failed = $FailedTests
        success_rate = if ($TotalTests -gt 0) { ($PassedTests / $TotalTests) * 100 } else { 0 }
    }
    tests = $TestResults
    phases = @{
        unit_integration = "completed"
        e2e = "completed"
        stress = "completed"
        memory = "completed"
        code_quality = "completed"
        performance = "skipped"
    }
} | ConvertTo-Json -Depth 10

$report | Out-File -FilePath "qa-test-report.json" -Encoding UTF8

Write-Host ""
Write-Host "Report saved to: qa-test-report.json" -ForegroundColor Green

# Display test results table
Write-Host ""
Write-Host "Test Results Details:" -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor White
$TestResults | ForEach-Object {
    $color = if ($_.Status -eq "PASSED") { "Green" } else { "Red" }
    Write-Host "$($_.Name): $($_.Status) ($('{0:N2}' -f $_.Duration)s)" -ForegroundColor $color
}

# Exit with appropriate code
Write-Host ""
if ($FailedTests -gt 0) {
    Write-Host "❌ QA SUITE FAILED" -ForegroundColor Red
    exit 1
} else {
    Write-Host "✅ QA SUITE PASSED" -ForegroundColor Green
    exit 0
}
