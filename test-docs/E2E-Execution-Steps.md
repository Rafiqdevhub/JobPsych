# E2E Testing - Step-by-Step Execution Guide

## 🎯 Objective

Execute End-to-End tests for JobPsych frontend application in a systematic, step-by-step manner.

---

## ⚡ Quick Start (5 Minutes)

If you want to start testing immediately:

```powershell
# Step 1: Install browsers (if not already done)
npx playwright install

# Step 2: Run a quick smoke test
npx playwright test landing-page.spec.js --project=chromium --headed
```

If both steps work, you're ready to proceed with the full testing plan below!

---

## 📅 Execution Plan by Steps

### ✅ STEP 1: Verify Installation (2 minutes)

**Goal**: Confirm Playwright is installed and ready

**Commands**:

```powershell
# Check Playwright version
npx playwright --version

# List installed browsers
npx playwright show-browsers

# If browsers not installed, run:
npx playwright install
```

**Expected Result**:

- Version: `1.56.0`
- Browsers: Chromium, Firefox, WebKit installed

**Next**: If all shows correctly → Go to Step 2

---

### ✅ STEP 2: Update Configuration (5 minutes)

**Goal**: Ensure playwright.config.js is properly configured

**Action Required**: Open `playwright.config.js` and verify/update:

```javascript
export default defineConfig({
  testDir: "./e2e", // ⚠️ Must be './e2e' not './tests'

  use: {
    baseURL: "http://localhost:3000", // ⚠️ Must be uncommented
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

**Verification Command**:

```powershell
# List test files that will be discovered
npx playwright test --list
```

**Expected Result**: Should list all tests from `e2e/` directory

**Next**: If tests are listed → Go to Step 3

---

### ✅ STEP 3: Start Development Server (1 minute)

**Goal**: Get application running for testing

**Terminal 1** (Keep this open):

```powershell
npm run dev
```

**Wait for**:

```
VITE v6.3.5  ready in XXXXms
➜  Local:   http://localhost:3000/
```

**Manual Verification**:

1. Open browser: http://localhost:3000
2. Verify page loads correctly
3. Check no console errors (F12)

**Next**: If application loads → Open Terminal 2 and go to Step 4

---

### ✅ STEP 4: First Test - Landing Page (3 minutes)

**Goal**: Run your first E2E test to verify setup

**Terminal 2** (New terminal):

```powershell
# Run landing page tests in Chromium with visible browser
npx playwright test landing-page.spec.js --project=chromium --headed
```

**What to Watch**:

- Browser window opens automatically
- Navigates to landing page
- Tests execute visible interactions
- Green checkmarks appear in terminal
- Browser closes automatically

**Expected Output**:

```
Running 17 tests using 1 worker

  ✓ Landing Page - Page Load › should load landing page
  ✓ Landing Page - Page Load › should display navigation header
  ... (more tests)

17 passed (25s)
```

**If Successful**: ✅ Your setup is working!  
**If Failed**: 🔴 See Troubleshooting section below

**Next**: If passed → Go to Step 5

---

### ✅ STEP 5: Test Each Page Individually (15 minutes)

**Goal**: Validate all page-specific tests

Run each command **one at a time**, verify it passes before moving to next:

#### Test 1: ATS Analyzer

```powershell
npx playwright test ats-analyzer.spec.js --project=chromium --headed
```

**Expected**: ~25 tests, all passing  
**Status**: [ ] ✅ Passed / [ ] 🔴 Failed

---

#### Test 2: Interview Prep

```powershell
npx playwright test interview-prep.spec.js --project=chromium --headed
```

**Expected**: ~30 tests, all passing  
**Status**: [ ] ✅ Passed / [ ] 🔴 Failed

---

#### Test 3: Role Suggestion

```powershell
npx playwright test role-suggestion.spec.js --project=chromium --headed
```

**Expected**: ~20 tests, all passing  
**Status**: [ ] ✅ Passed / [ ] 🔴 Failed

---

#### Test 4: Hire Disk

```powershell
npx playwright test hire-disk.spec.js --project=chromium --headed
```

**Expected**: ~15 tests, all passing  
**Status**: [ ] ✅ Passed / [ ] 🔴 Failed

---

#### Test 5: Chatbot

```powershell
npx playwright test chatbot.spec.js --project=chromium --headed
```

**Expected**: ~14 tests, all passing  
**Status**: [ ] ✅ Passed / [ ] 🔴 Failed

---

#### Test 6: User Journeys

```powershell
npx playwright test user-journeys.spec.js --project=chromium --headed
```

**Expected**: ~10 tests, all passing  
**Status**: [ ] ✅ Passed / [ ] 🔴 Failed

---

**Summary After Step 5**:

- Total test files: 7
- Files passing: \_\_\_\_
- Files failing: \_\_\_\_
- Total duration: \_\_\_\_

**Next**: If most tests pass → Go to Step 6

---

### ✅ STEP 6: Run All Tests - Chromium Only (5 minutes)

**Goal**: Execute complete test suite in one browser

```powershell
npx playwright test --project=chromium
```

**What This Does**:

- Runs ALL test files sequentially
- Only in Chromium browser
- Generates HTML report at the end

**Expected Output**:

```
Running 120+ tests using 1 worker

  ... test results ...

110 passed (4m 30s)
```

**After Completion**:

```powershell
# View the HTML report
npx playwright show-report
```

**Report Will Show**:

- Test summary (passed/failed/skipped)
- Execution time per test
- Screenshots (if any failures)
- Videos (if any failures)
- Detailed logs

**Metrics to Record**:

- Total tests: \_\_\_\_
- Passed: \_\_\_\_
- Failed: \_\_\_\_
- Duration: \_\_\_\_
- Pass rate: \_\_\_\_%

**Next**: If >90% passing → Go to Step 7

---

### ✅ STEP 7: Multi-Browser Testing (10 minutes)

**Goal**: Ensure cross-browser compatibility

#### Test in Firefox

```powershell
npx playwright test --project=firefox
```

**Status**: [ ] ✅ Passed / [ ] 🔴 Failed  
**Pass Rate**: \_\_\_\_%

---

#### Test in WebKit (Safari)

```powershell
npx playwright test --project=webkit
```

**Status**: [ ] ✅ Passed / [ ] 🔴 Failed  
**Pass Rate**: \_\_\_\_%

---

#### Compare Results

| Browser  | Passed | Failed | Duration | Pass Rate |
| -------- | ------ | ------ | -------- | --------- |
| Chromium |        |        |          |           |
| Firefox  |        |        |          |           |
| WebKit   |        |        |          |           |

**Next**: If all browsers >85% passing → Go to Step 8

---

### ✅ STEP 8: Parallel Execution - All Browsers (8 minutes)

**Goal**: Run tests in all browsers simultaneously

```powershell
npx playwright test
```

**What Happens**:

- Tests run in parallel across all configured browsers
- Much faster than sequential execution
- Generates combined report

**Expected Duration**: 3-5 minutes (vs 15+ minutes sequential)

**After Completion**:

```powershell
npx playwright show-report
```

**In Report, Check**:

- [ ] All browsers completed
- [ ] Similar pass rates across browsers
- [ ] No browser-specific failures
- [ ] Parallel execution worked correctly

**Next**: If all looks good → Go to Step 9

---

### ✅ STEP 9: Mobile Testing (5 minutes)

**Goal**: Validate mobile responsiveness

#### Mobile Chrome

```powershell
npx playwright test --project="Mobile Chrome"
```

**Status**: [ ] ✅ Passed / [ ] 🔴 Failed

---

#### Mobile Safari

```powershell
npx playwright test --project="Mobile Safari"
```

**Status**: [ ] ✅ Passed / [ ] 🔴 Failed

---

**Mobile Test Observations**:

- [ ] Viewport sizes correct
- [ ] Touch interactions work
- [ ] Mobile UI elements visible
- [ ] Responsive design working

**Next**: Go to Step 10

---

### ✅ STEP 10: Debug Mode Practice (Optional - 10 minutes)

**Goal**: Learn debugging tools for when tests fail

#### UI Mode (Recommended)

```powershell
npx playwright test --ui
```

**Features to Explore**:

- Timeline view of test execution
- Click on any test to see details
- Watch tests run in real-time
- Inspect screenshots/videos
- View traces
- Re-run specific tests

---

#### Debug Mode

```powershell
# Debug specific test
npx playwright test landing-page.spec.js --debug
```

**Features to Try**:

- Pause/play execution
- Step through test line by line
- Inspect elements in browser
- View console logs
- Take manual screenshots

---

**Next**: You're ready for final validation!

---

## 📊 Final Validation Checklist

After completing all steps, verify:

### Environment ✅

- [ ] Playwright v1.56.0 installed
- [ ] All browsers installed and working
- [ ] Configuration file correct
- [ ] Dev server auto-starts with tests

### Test Execution ✅

- [ ] All 7 test files execute
- [ ] > 95% tests passing in Chromium
- [ ] > 90% tests passing in Firefox
- [ ] > 90% tests passing in WebKit
- [ ] Mobile tests passing
- [ ] Parallel execution works

### Reports ✅

- [ ] HTML reports generate
- [ ] Reports open in browser
- [ ] Screenshots visible
- [ ] Videos available
- [ ] Traces captured

### Performance ✅

- [ ] Full suite < 5 minutes (parallel)
- [ ] No timeout errors
- [ ] Tests are stable (run 3x to verify)
- [ ] No flaky tests

---

## 🎯 Success Metrics

Record your final metrics:

### Overall Results

- **Total Tests**: \_\_\_\_
- **Passed**: \_**\_ (\_\_**%)
- **Failed**: \_**\_ (\_\_**%)
- **Flaky**: \_\_\_\_
- **Duration**: \_\_\_\_ minutes

### Browser Breakdown

| Browser       | Tests | Passed | Failed | Pass % |
| ------------- | ----- | ------ | ------ | ------ |
| Chromium      |       |        |        |        |
| Firefox       |       |        |        |        |
| WebKit        |       |        |        |        |
| Mobile Chrome |       |        |        |        |
| Mobile Safari |       |        |        |        |

### Performance

- **Parallel Execution**: \_\_\_\_ minutes
- **Sequential Execution**: \_\_\_\_ minutes
- **Speed Improvement**: \_\_\_\_x faster

---

## 🚨 Troubleshooting Guide

### Problem 1: "baseURL is not set"

**Error Message**:

```
Error: Test finished within timeout but baseURL was not used
```

**Solution**:

```javascript
// In playwright.config.js, uncomment and set:
use: {
  baseURL: 'http://localhost:3000',
}
```

---

### Problem 2: "Port 3000 is already in use"

**Error Message**:

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**:

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
Stop-Process -Id <PID> -Force

# Or use a different port in vite.config.js
```

---

### Problem 3: Tests timeout

**Error Message**:

```
TimeoutError: page.goto: Timeout 30000ms exceeded
```

**Solution**:

```javascript
// In playwright.config.js, increase timeouts:
use: {
  actionTimeout: 15000,
  navigationTimeout: 45000,
}
```

---

### Problem 4: Element not found

**Error Message**:

```
Error: locator.click: Target closed
```

**Solution**:
Add wait conditions in test:

```javascript
await page.waitForLoadState("networkidle");
await page.waitForSelector('button[name="submit"]');
```

---

### Problem 5: Browser not installed

**Error Message**:

```
Error: Executable doesn't exist at ...
```

**Solution**:

```powershell
# Reinstall all browsers
npx playwright install

# Or install with dependencies
npx playwright install --with-deps
```

---

## 📝 Post-Testing Actions

After successful E2E testing:

### 1. Document Results

- [ ] Record final metrics in this document
- [ ] Take screenshots of reports
- [ ] Note any issues found
- [ ] List any skipped tests

### 2. Fix Failures

- [ ] Identify root cause of failures
- [ ] Update tests or application code
- [ ] Re-run failed tests
- [ ] Verify fixes work

### 3. Code Cleanup

- [ ] Remove any `.only` or `.skip` from tests
- [ ] Update test descriptions if needed
- [ ] Add comments for complex tests
- [ ] Commit all changes

### 4. Prepare for CI/CD

- [ ] Verify tests work without dev server running
- [ ] Test with `webServer` auto-start
- [ ] Document any environment variables needed
- [ ] Create CI/CD workflow (Phase 6)

---

## 🔄 Daily Testing Workflow

Once setup is complete, your daily workflow should be:

```powershell
# Morning routine (after pulling latest code)
npm run dev                    # Terminal 1
npx playwright test            # Terminal 2

# Before committing changes
npx playwright test            # Run all tests

# Before creating PR
npx playwright test            # Final validation
npx playwright show-report     # Review results
```

---

## 📅 Next Steps: Phase 6 - CI/CD Integration

After completing Phase 4 E2E testing, you'll move to:

1. **Create GitHub Actions workflow**

   - Automated test execution on every push
   - Test on multiple OS (Windows, Linux, macOS)
   - Artifact storage for reports

2. **Configure test reporting in CI**

   - Publish HTML reports
   - Track test trends over time
   - Notify on failures

3. **Setup branch protection**
   - Require tests to pass before merge
   - Block PRs with failing tests
   - Enforce code review

---

## 🎓 Learning Resources

- **Playwright Docs**: https://playwright.dev/docs/intro
- **Best Practices**: https://playwright.dev/docs/best-practices
- **API Reference**: https://playwright.dev/docs/api/class-playwright
- **Debugging Guide**: https://playwright.dev/docs/debug

---

## ✅ Completion Checklist

Mark each when complete:

- [ ] Step 1: Installation verified
- [ ] Step 2: Configuration updated
- [ ] Step 3: Dev server running
- [ ] Step 4: First test passed
- [ ] Step 5: All page tests passed
- [ ] Step 6: Full suite passed (Chromium)
- [ ] Step 7: Multi-browser tests passed
- [ ] Step 8: Parallel execution verified
- [ ] Step 9: Mobile tests passed
- [ ] Step 10: Debug tools explored
- [ ] Final validation complete
- [ ] Metrics recorded
- [ ] Results documented
- [ ] Ready for Phase 6 (CI/CD)

---

**Congratulations! 🎉**

You've successfully completed Phase 4: End-to-End Testing with Playwright!

**Status**: ⚪ Not Started / 🟡 In Progress / 🟢 Complete

**Completion Date**: ****\_\_\_\_****

**Next Phase**: CI/CD Integration (Phase 6)

---

**Document Version**: 1.0  
**Created**: October 9, 2025  
**Last Updated**: October 9, 2025
