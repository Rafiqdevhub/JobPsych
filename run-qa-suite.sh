#!/bin/bash

# Final Quality Assurance Test Suite
# Runs all tests and generates comprehensive report

echo "======================================"
echo "JobPsych Frontend - Final QA Test Suite"
echo "Started: $(date)"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test results
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run a test and track results
run_test() {
  local test_name=$1
  local test_command=$2
  
  echo "----------------------------------------"
  echo "Running: $test_name"
  echo "----------------------------------------"
  
  if eval "$test_command"; then
    echo -e "${GREEN}✓ $test_name PASSED${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
    return 0
  else
    echo -e "${RED}✗ $test_name FAILED${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
    return 1
  fi
  
  TOTAL_TESTS=$((TOTAL_TESTS + 1))
  echo ""
}

# Start test execution
echo "Phase 1: Unit and Integration Tests"
echo "======================================"
run_test "Unit Tests" "npm run test -- --run --reporter=basic"
run_test "Integration Tests" "npm run test:integration"

echo ""
echo "Phase 2: End-to-End Tests"
echo "======================================"
run_test "E2E Smoke Tests" "npm run test:e2e -- smoke.spec.js"
run_test "E2E User Journeys" "npm run test:e2e -- user-journeys.spec.js"
run_test "E2E Landing Page" "npm run test:e2e -- landing-page.spec.js"

echo ""
echo "Phase 3: Stress Testing"
echo "======================================"
run_test "Stress Tests" "npm run test:e2e -- stress-test.spec.js --workers=1"

echo ""
echo "Phase 4: Memory Leak Detection"
echo "======================================"
run_test "Memory Leak Tests" "npm run test:e2e -- memory-leak-test.spec.js --workers=1"

echo ""
echo "Phase 5: Code Quality"
echo "======================================"
run_test "ESLint Check" "npm run lint"
run_test "Build Verification" "npm run build"

echo ""
echo "Phase 6: Performance Tests"
echo "======================================"
echo "⚠ Load tests skipped (requires running dev server)"
echo "To run load tests manually:"
echo "  1. Start dev server: npm run dev"
echo "  2. Run: cd loadtest && npm run test:load"
echo ""

# Generate summary report
echo ""
echo "======================================"
echo "Final QA Test Suite Summary"
echo "======================================"
echo "Total Tests: $TOTAL_TESTS"
echo -e "Passed: ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed: ${RED}$FAILED_TESTS${NC}"
echo ""
echo "Completed: $(date)"
echo "======================================"

# Create JSON report
cat > qa-test-report.json <<EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "summary": {
    "total": $TOTAL_TESTS,
    "passed": $PASSED_TESTS,
    "failed": $FAILED_TESTS,
    "success_rate": $(echo "scale=2; $PASSED_TESTS * 100 / $TOTAL_TESTS" | bc)
  },
  "phases": {
    "unit_integration": "completed",
    "e2e": "completed",
    "stress": "completed",
    "memory": "completed",
    "code_quality": "completed",
    "performance": "skipped"
  }
}
EOF

echo ""
echo "Report saved to: qa-test-report.json"

# Exit with appropriate code
if [ $FAILED_TESTS -gt 0 ]; then
  echo -e "${RED}❌ QA SUITE FAILED${NC}"
  exit 1
else
  echo -e "${GREEN}✅ QA SUITE PASSED${NC}"
  exit 0
fi
