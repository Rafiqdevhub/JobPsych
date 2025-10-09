# E2E Testing Plan - Step-by-Step Guide

## Phase 4: End-to-End Testing with Playwright

> **Date Created**: October 9, 2025  
> **Framework**: Playwright v1.56.0  
> **Application**: JobPsych Frontend  
> **Testing Approach**: Incremental, Step-by-Step

---

## Overview

This document provides a **step-by-step plan** to set up, configure, and execute End-to-End (E2E) tests for the JobPsych frontend application using Playwright. Each step is designed to be executed independently to ensure proper setup and validation.

---

## Testing Objectives

1. ✅ Verify Playwright setup and configuration
2. ✅ Test development environment readiness
3. ✅ Execute basic smoke tests
4. ✅ Run page-specific E2E tests
5. ✅ Validate complete user journeys
6. ✅ Generate and review test reports
7. ✅ Prepare for CI/CD integration

---

## STEP 1: Environment Setup & Verification

### 1.1 Verify Playwright Installation

**Objective**: Ensure Playwright is properly installed with all browsers.

```powershell
# Check Playwright version
npx playwright --version

# Expected output: Version 1.56.0
```

**Success Criteria**: ✅ Playwright version displays correctly

---

### 1.2 Install Playwright Browsers

**Objective**: Install browser binaries for testing.

```powershell
# Install all browser binaries (Chromium, Firefox, WebKit)
npx playwright install

# Install with dependencies (if needed)
npx playwright install --with-deps
```

**Success Criteria**:

- ✅ Chromium browser installed
- ✅ Firefox browser installed
- ✅ WebKit browser installed

**Verification**:

```powershell
# List installed browsers
npx playwright show-browsers
```

---

### 1.3 Verify Project Structure

**Objective**: Ensure all E2E test files are in place.

**Check these files exist**:

```
jobpsych frontend/
├── playwright.config.js          ✅ Main configuration
├── e2e/                           ✅ Test directory
│   ├── landing-page.spec.js      ✅ Landing page tests
│   ├── ats-analyzer.spec.js      ✅ Resume analyzer tests
│   ├── interview-prep.spec.js    ✅ Interview prep tests
│   ├── role-suggestion.spec.js   ✅ Role suggestion tests
│   ├── hire-disk.spec.js         ✅ Hire disk tests
│   ├── chatbot.spec.js           ✅ Chatbot tests
│   └── user-journeys.spec.js     ✅ Complete user flows
└── package.json                   ✅ Scripts configured
```

**Verification Command**:

```powershell
# List all E2E test files
Get-ChildItem -Path "./e2e" -Filter "*.spec.js"
```

**Success Criteria**: ✅ All 7 test files are present

---

## STEP 2: Configuration Setup

### 2.1 Update Playwright Configuration

**Objective**: Configure Playwright for the JobPsych application.

**File**: `playwright.config.js`

**Required Updates**:

```javascript
export default defineConfig({
  testDir: "./e2e", // ⚠️ CHANGE FROM './tests' TO './e2e'
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html"], // HTML report for browser viewing
    ["list"], // Console output
    ["json", { outputFile: "test-results.json" }], // JSON for CI/CD
  ],

  use: {
    baseURL: "http://localhost:3000", // ⚠️ UNCOMMENT AND SET
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // Mobile viewports
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  // Web server configuration
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

**Key Configuration Points**:

- ✅ `testDir`: Points to `./e2e` directory
- ✅ `baseURL`: Set to development server URL
- ✅ `webServer`: Auto-starts dev server before tests
- ✅ `reporters`: HTML, list, and JSON output
- ✅ `projects`: Multiple browsers and mobile devices

**Success Criteria**: ✅ Configuration file updated correctly

---

### 2.2 Verify Package.json Scripts

**Objective**: Ensure test scripts are properly configured.

**File**: `package.json`

**Required Scripts**:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:chromium": "playwright test --project=chromium",
    "test:e2e:firefox": "playwright test --project=firefox",
    "test:e2e:webkit": "playwright test --project=webkit",
    "test:e2e:report": "playwright show-report"
  }
}
```

**Success Criteria**: ✅ All E2E scripts are present

---

## STEP 3: Initial Test Run - Smoke Tests

### 3.1 Start Development Server (Manual)

**Objective**: Ensure application runs before testing.

**Terminal 1** (Keep this running):

```powershell
npm run dev
```

**Expected Output**:

```
VITE v6.3.5  ready in 1330 ms
➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

**Verification Steps**:

1. Open browser: `http://localhost:3000`
2. Verify landing page loads
3. Check navigation works
4. Test chatbot toggle

**Success Criteria**:

- ✅ Server running on port 3000
- ✅ Application loads in browser
- ✅ No console errors

---

### 3.2 Run Basic Smoke Test

**Objective**: Test a single spec file to verify setup.

**Terminal 2** (New terminal):

```powershell
# Run only landing page tests in one browser
npx playwright test landing-page.spec.js --project=chromium
```

**Expected Output**:

```
Running 15 tests using 1 worker

  ✓  [chromium] › landing-page.spec.js:8:3 › Landing Page - Page Load › should load landing page (1s)
  ✓  [chromium] › landing-page.spec.js:15:3 › Landing Page - Page Load › should display navigation header
  ...
  15 passed (30s)
```

**If Tests Fail**:

1. Check dev server is running
2. Verify baseURL in config
3. Check for console errors
4. Review test output for specific failures

**Success Criteria**:

- ✅ All landing page tests pass
- ✅ No timeout errors
- ✅ Screenshots captured (if failures)

---

## STEP 4: Progressive Test Execution

### 4.1 Test Individual Pages (One at a Time)

**Objective**: Validate each page's E2E tests independently.

#### Test 1: Landing Page ✅

```powershell
npx playwright test landing-page.spec.js --project=chromium --headed
```

**What to observe**:

- Browser opens automatically
- Page navigates to landing page
- Tests interact with UI elements
- Browser closes after completion

**Success Criteria**: All landing page tests pass

---

#### Test 2: ATS Analyzer

```powershell
npx playwright test ats-analyzer.spec.js --project=chromium --headed
```

**What to observe**:

- File upload interface appears
- Form validation works
- Error handling displays correctly

**Success Criteria**: All ATS analyzer tests pass

---

#### Test 3: Interview Prep

```powershell
npx playwright test interview-prep.spec.js --project=chromium --headed
```

**What to observe**:

- Input fields are accessible
- Interview type selection works
- Generate functionality responds

**Success Criteria**: All interview prep tests pass

---

#### Test 4: Role Suggestion

```powershell
npx playwright test role-suggestion.spec.js --project=chromium --headed
```

**What to observe**:

- Skills input works
- Role recommendations display
- Navigation functions correctly

**Success Criteria**: All role suggestion tests pass

---

#### Test 5: Hire Disk

```powershell
npx playwright test hire-disk.spec.js --project=chromium --headed
```

**What to observe**:

- Page loads correctly
- UI elements are interactive
- Features display properly

**Success Criteria**: All hire disk tests pass

---

#### Test 6: Chatbot

```powershell
npx playwright test chatbot.spec.js --project=chromium --headed
```

**What to observe**:

- Chatbot toggle works on all pages
- Input and send functionality
- Message display is correct
- Mobile responsiveness

**Success Criteria**: All chatbot tests pass

---

#### Test 7: User Journeys

```powershell
npx playwright test user-journeys.spec.js --project=chromium --headed
```

**What to observe**:

- Complete workflows function
- Navigation between pages
- Data persistence
- Error recovery

**Success Criteria**: All user journey tests pass

---

### 4.2 Run All Tests in One Browser

**Objective**: Execute complete test suite in Chromium.

```powershell
npx playwright test --project=chromium
```

**Expected Results**:

- All test files execute sequentially
- Summary report shows pass/fail counts
- HTML report generated automatically

**Success Criteria**:

- ✅ 80%+ tests passing
- ✅ No critical failures
- ✅ Report generated

---

## 🌐 STEP 5: Multi-Browser Testing

### 5.1 Test in Firefox

**Objective**: Verify cross-browser compatibility.

```powershell
npx playwright test --project=firefox
```

**What to check**:

- All tests pass in Firefox
- No Firefox-specific issues
- UI renders correctly

**Success Criteria**: ✅ Same pass rate as Chromium

---

### 5.2 Test in WebKit (Safari)

**Objective**: Ensure Safari compatibility.

```powershell
npx playwright test --project=webkit
```

**What to check**:

- WebKit-specific rendering
- Touch interactions (if applicable)
- Safari-specific behaviors

**Success Criteria**: ✅ Similar pass rate to other browsers

---

### 5.3 Test All Browsers in Parallel

**Objective**: Run full test suite across all browsers.

```powershell
npx playwright test
```

**Expected Behavior**:

- Tests run in parallel across browsers
- Faster execution than sequential
- Separate reports for each browser

**Success Criteria**:

- ✅ All browsers complete
- ✅ Consistent results across browsers
- ✅ Total execution time < 5 minutes

---

## 📱 STEP 6: Mobile Testing

### 6.1 Test Mobile Chrome

**Objective**: Verify mobile responsiveness.

```powershell
npx playwright test --project="Mobile Chrome"
```

**What to verify**:

- Mobile viewport renders correctly
- Touch interactions work
- Mobile-specific UI appears
- Responsive design adapts

**Success Criteria**: ✅ Mobile tests pass

---

### 6.2 Test Mobile Safari

**Objective**: Test iOS mobile experience.

```powershell
npx playwright test --project="Mobile Safari"
```

**What to verify**:

- iOS-specific behaviors
- Touch gestures
- Safari mobile rendering

**Success Criteria**: ✅ Mobile Safari tests pass

---

## 🐛 STEP 7: Debug Mode Testing

### 7.1 Use Playwright Inspector

**Objective**: Debug failing tests interactively.

```powershell
# Debug specific test
npx playwright test landing-page.spec.js --debug

# Debug from specific line
npx playwright test landing-page.spec.js:15 --debug
```

**Inspector Features**:

- ⏸️ Pause/resume execution
- 🔍 Inspect elements
- 📝 View console logs
- 🎬 Step through actions
- 📸 Take screenshots

**How to Use**:

1. Test opens in inspector
2. Click "▶️ Resume" to run
3. Use "⏭️ Step over" to go line-by-line
4. Inspect elements in browser
5. Check console for errors

**Success Criteria**: ✅ Can debug and fix failing tests

---

### 7.2 Use UI Mode

**Objective**: Visual test debugging and exploration.

```powershell
npm run test:e2e:ui
```

**UI Mode Features**:

- 📊 Visual test timeline
- 🎬 Watch tests execute
- 🔄 Re-run specific tests
- 📸 View screenshots
- 🎥 Watch videos
- 📋 Inspect traces

**Success Criteria**: ✅ Can visualize and interact with tests

---

## 📈 STEP 8: Test Reports & Analysis

### 8.1 Generate HTML Report

**Objective**: Create detailed test report.

```powershell
# Run tests and generate report
npx playwright test

# View report (opens in browser)
npx playwright show-report
```

**Report Contains**:

- ✅ Test execution summary
- ✅ Pass/fail counts per browser
- ✅ Execution time per test
- ✅ Screenshots of failures
- ✅ Videos of failed tests
- ✅ Trace files for debugging

**Success Criteria**: ✅ Report opens and displays results

---

### 8.2 Analyze Test Results

**Objective**: Review test outcomes and identify issues.

**Key Metrics to Check**:

1. **Overall Pass Rate**

   - Target: >95% passing
   - Current: **_ / _** tests passing

2. **Test Execution Time**

   - Target: <5 minutes total
   - Current: \_\_\_ minutes

3. **Browser Compatibility**

   - Chromium: \_\_\_ % passing
   - Firefox: \_\_\_ % passing
   - WebKit: \_\_\_ % passing

4. **Flaky Tests**

   - Tests that fail intermittently
   - Review and stabilize these

5. **Common Failures**
   - Timeout errors
   - Element not found
   - Navigation issues
   - API errors

**Action Items from Analysis**:

- [ ] Fix failing tests
- [ ] Increase timeouts if needed
- [ ] Update selectors
- [ ] Add wait conditions
- [ ] Stabilize flaky tests

---

## 🎥 STEP 9: Trace Viewer Analysis

### 9.1 Review Test Traces

**Objective**: Deep-dive into test execution details.

```powershell
# View trace from latest run
npx playwright show-trace trace.zip

# Or open specific trace file
npx playwright show-trace playwright-report/trace.zip
```

**Trace Viewer Shows**:

- 🎬 Complete test timeline
- 📸 Screenshot at each step
- 🌐 Network requests
- 📝 Console logs
- ⏱️ Timing information
- 🔍 DOM snapshots

**Success Criteria**: ✅ Can analyze traces for debugging

---

## ✅ STEP 10: Validation Checklist

### Final Verification Before CI/CD

**Environment Setup** ✅

- [ ] Playwright installed (v1.56.0)
- [ ] All browsers installed
- [ ] Configuration file updated
- [ ] Test directory structure correct
- [ ] Package.json scripts configured

**Test Execution** ✅

- [ ] All landing page tests pass
- [ ] All ATS analyzer tests pass
- [ ] All interview prep tests pass
- [ ] All role suggestion tests pass
- [ ] All hire disk tests pass
- [ ] All chatbot tests pass
- [ ] All user journey tests pass

**Browser Coverage** ✅

- [ ] Chromium tests passing (>95%)
- [ ] Firefox tests passing (>95%)
- [ ] WebKit tests passing (>95%)
- [ ] Mobile Chrome tests passing
- [ ] Mobile Safari tests passing

**Reporting** ✅

- [ ] HTML report generates successfully
- [ ] Test results are accurate
- [ ] Screenshots captured on failures
- [ ] Videos recorded on failures
- [ ] Traces available for debugging

**Performance** ✅

- [ ] Full suite runs in <5 minutes
- [ ] No timeout errors
- [ ] Tests are stable (not flaky)
- [ ] Parallel execution works

---

## 🚨 Troubleshooting Guide

### Common Issues & Solutions

#### Issue 1: Dev Server Not Starting

**Symptoms**:

```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

**Solutions**:

```powershell
# 1. Check if port 3000 is already in use
netstat -ano | findstr :3000

# 2. Kill existing process
Stop-Process -Id <PID> -Force

# 3. Start dev server manually
npm run dev
```

---

#### Issue 2: Browser Installation Failed

**Symptoms**:

```
Error: Executable doesn't exist at ...
```

**Solutions**:

```powershell
# Reinstall browsers with dependencies
npx playwright install --with-deps

# Or install specific browser
npx playwright install chromium
```

---

#### Issue 3: Tests Timeout

**Symptoms**:

```
TimeoutError: waiting for navigation to...
```

**Solutions**:

1. Increase timeout in `playwright.config.js`:

```javascript
use: {
  actionTimeout: 15000,
  navigationTimeout: 45000,
}
```

2. Add explicit waits in tests:

```javascript
await page.waitForLoadState("networkidle");
await page.waitForTimeout(2000);
```

---

#### Issue 4: Element Not Found

**Symptoms**:

```
Error: locator.click: Target closed
```

**Solutions**:

1. Add wait conditions:

```javascript
await page.waitForSelector('button[name="submit"]');
```

2. Use more robust locators:

```javascript
// Instead of:
page.locator("button");

// Use:
page.getByRole("button", { name: "Submit" });
```

---

#### Issue 5: Flaky Tests

**Symptoms**: Tests pass sometimes, fail other times

**Solutions**:

1. Add auto-wait mechanisms:

```javascript
await expect(element).toBeVisible();
```

2. Wait for network to be idle:

```javascript
await page.waitForLoadState("networkidle");
```

3. Increase retries in config:

```javascript
retries: 2,
```

---

## 📚 Additional Resources

### Playwright Documentation

- [Official Docs](https://playwright.dev/docs/intro)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

### Command Reference

```powershell
# Run all tests
npx playwright test

# Run specific file
npx playwright test landing-page.spec.js

# Run specific test
npx playwright test landing-page.spec.js -g "should load landing page"

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run with UI mode
npx playwright test --ui

# Run specific browser
npx playwright test --project=chromium

# Generate report
npx playwright show-report

# View trace
npx playwright show-trace trace.zip

# List all tests
npx playwright test --list

# Show installed browsers
npx playwright show-browsers
```

---

## 📋 Next Steps After E2E Setup

Once all steps are complete and tests are passing:

### 1. CI/CD Integration (Phase 6)

- [ ] Create GitHub Actions workflow
- [ ] Configure test execution in CI
- [ ] Setup artifact storage for reports
- [ ] Configure failure notifications

### 2. Test Maintenance

- [ ] Document test patterns
- [ ] Create test writing guidelines
- [ ] Setup test code review process
- [ ] Schedule regular test audits

### 3. Advanced Testing

- [ ] Add visual regression tests
- [ ] Implement accessibility tests
- [ ] Add performance tests
- [ ] Create API contract tests

### 4. Monitoring

- [ ] Track test execution metrics
- [ ] Monitor flaky test rates
- [ ] Analyze test coverage
- [ ] Review failure patterns

---

## ✨ Success Criteria Summary

Your E2E testing setup is **complete and ready** when:

✅ **Installation & Setup**

- Playwright v1.56.0 installed
- All browsers installed
- Configuration correct

✅ **Test Execution**

- All 7 test files executing
- > 95% tests passing
- <5 minute execution time

✅ **Browser Coverage**

- Chromium: ✅ Passing
- Firefox: ✅ Passing
- WebKit: ✅ Passing
- Mobile: ✅ Passing

✅ **Reporting**

- HTML reports generating
- Screenshots on failures
- Videos on failures
- Traces available

✅ **Stability**

- No flaky tests
- Consistent results
- No timeout issues

---

## 🎯 Test Execution Workflow

```
┌─────────────────────────────────────────────────────────┐
│                 E2E Testing Workflow                     │
└─────────────────────────────────────────────────────────┘
                         │
                         ↓
        ┌────────────────────────────────┐
        │  1. Start Dev Server           │
        │     npm run dev                │
        └────────────────┬───────────────┘
                         ↓
        ┌────────────────────────────────┐
        │  2. Run Single Test File       │
        │     npx playwright test        │
        │     landing-page.spec.js       │
        └────────────────┬───────────────┘
                         ↓
        ┌────────────────────────────────┐
        │  3. Review Results             │
        │     - All tests pass? → Next   │
        │     - Tests fail? → Debug      │
        └────────────────┬───────────────┘
                         ↓
        ┌────────────────────────────────┐
        │  4. Run All Tests              │
        │     npx playwright test        │
        └────────────────┬───────────────┘
                         ↓
        ┌────────────────────────────────┐
        │  5. Multi-Browser Testing      │
        │     All browsers               │
        └────────────────┬───────────────┘
                         ↓
        ┌────────────────────────────────┐
        │  6. Review HTML Report         │
        │     npx playwright show-report │
        └────────────────┬───────────────┘
                         ↓
        ┌────────────────────────────────┐
        │  7. Fix Failures & Re-run      │
        └────────────────┬───────────────┘
                         ↓
        ┌────────────────────────────────┐
        │  8. ✅ Ready for CI/CD         │
        └────────────────────────────────┘
```

---

**Document Version**: 1.0  
**Last Updated**: October 9, 2025  
**Status**: Ready for Execution  
**Next Review**: After Phase 6 completion

---

## Quick Start Commands

```powershell
# Step 1: Install browsers
npx playwright install

# Step 2: Start dev server (Terminal 1)
npm run dev

# Step 3: Run first test (Terminal 2)
npx playwright test landing-page.spec.js --headed

# Step 4: Run all tests
npx playwright test

# Step 5: View report
npx playwright show-report

# Step 6: Debug if needed
npx playwright test --ui
```

**Good luck with your E2E testing! 🚀**
