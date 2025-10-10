# E2E Testing Checklist - Quick Reference

## 🎯 Pre-Testing Setup

### Environment Check

- [ ] Node.js installed (v18+)
- [ ] npm/yarn available
- [ ] Git repository up to date
- [ ] All dependencies installed (`npm install`)

### Playwright Setup

- [ ] Playwright installed (`@playwright/test` v1.56.0 in package.json)
- [ ] Browsers installed (`npx playwright install`)
- [ ] Configuration file present (`playwright.config.js`)
- [ ] Test directory exists (`e2e/`)

---

## 📝 Configuration Verification

### playwright.config.js

- [ ] `testDir` set to `'./e2e'`
- [ ] `baseURL` set to `'http://localhost:3000'`
- [ ] `webServer` configured to auto-start dev server
- [ ] Multiple browsers configured (chromium, firefox, webkit)
- [ ] Mobile devices configured
- [ ] Reporters configured (html, list, json)
- [ ] Timeouts set appropriately
- [ ] Screenshots enabled on failure
- [ ] Videos enabled on failure
- [ ] Trace enabled on retry

### package.json Scripts

- [ ] `test:e2e` - Run all tests
- [ ] `test:e2e:ui` - UI mode
- [ ] `test:e2e:debug` - Debug mode
- [ ] `test:e2e:headed` - Headed mode
- [ ] Additional browser-specific scripts (optional)

---

## 🧪 Test Files Verification

### Core Test Files Present

- [ ] `e2e/landing-page.spec.js` ✅
- [ ] `e2e/ats-analyzer.spec.js` ✅
- [ ] `e2e/interview-prep.spec.js` ✅
- [ ] `e2e/role-suggestion.spec.js` ✅
- [ ] `e2e/hire-disk.spec.js` ✅
- [ ] `e2e/chatbot.spec.js` ✅
- [ ] `e2e/user-journeys.spec.js` ✅

### Test File Structure

Each test file should have:

- [ ] Import statements (`@playwright/test`)
- [ ] `test.describe` blocks for organization
- [ ] `test.beforeEach` for setup
- [ ] Individual test cases with clear names
- [ ] Proper assertions using `expect`
- [ ] Cleanup in `afterEach` (if needed)

---

## 🚀 Execution Steps

### Step 1: Initial Smoke Test

```powershell
# Terminal 1 - Start dev server
npm run dev

# Terminal 2 - Run single test
npx playwright test landing-page.spec.js --project=chromium --headed
```

- [ ] Dev server started successfully
- [ ] Browser opens and navigates
- [ ] Tests execute without errors
- [ ] All assertions pass
- [ ] Browser closes cleanly

### Step 2: Individual Page Tests

Run each test file separately in headed mode:

```powershell
npx playwright test landing-page.spec.js --headed
```

- [ ] Landing Page tests ✅
- [ ] ATS Analyzer tests ✅
- [ ] Interview Prep tests ✅
- [ ] Role Suggestion tests ✅
- [ ] Hire Disk tests ✅
- [ ] Chatbot tests ✅
- [ ] User Journeys tests ✅

### Step 3: Single Browser (Chromium)

```powershell
npx playwright test --project=chromium
```

- [ ] All tests run
- [ ] Pass rate > 95%
- [ ] Execution time < 5 minutes
- [ ] No timeout errors
- [ ] HTML report generated

### Step 4: Multi-Browser Testing

```powershell
npx playwright test --project=firefox
npx playwright test --project=webkit
```

- [ ] Firefox tests pass (similar to Chromium)
- [ ] WebKit tests pass (similar to Chromium)
- [ ] Cross-browser issues identified (if any)

### Step 5: All Browsers Parallel

```powershell
npx playwright test
```

- [ ] Tests run in parallel
- [ ] All browsers complete successfully
- [ ] Consistent results across browsers
- [ ] Total time reasonable (parallelization working)

### Step 6: Mobile Testing

```powershell
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

- [ ] Mobile viewport renders correctly
- [ ] Touch interactions work
- [ ] Responsive design validated
- [ ] Mobile-specific features tested

---

## 📊 Results Validation

### Test Execution Metrics

- [ ] Total tests: **\_**
- [ ] Passed: **\_** (target: >95%)
- [ ] Failed: **\_** (target: <5%)
- [ ] Skipped: **\_**
- [ ] Flaky: **\_** (target: 0)
- [ ] Duration: **\_** (target: <5 min)

### Browser Coverage

- [ ] Chromium: \_\_\_\_ % passing
- [ ] Firefox: \_\_\_\_ % passing
- [ ] WebKit: \_\_\_\_ % passing
- [ ] Mobile Chrome: \_\_\_\_ % passing
- [ ] Mobile Safari: \_\_\_\_ % passing

### Report Generation

- [ ] HTML report created (`playwright-report/`)
- [ ] Report opens in browser
- [ ] Screenshots visible for failures
- [ ] Videos available for failures
- [ ] Traces captured for retries

---

## 🐛 Debugging Checklist

### If Tests Fail:

#### 1. Check Development Server

- [ ] Server running on correct port (3000)
- [ ] No console errors in server logs
- [ ] Application loads in browser manually
- [ ] API endpoints responding

#### 2. Check Test Configuration

- [ ] `baseURL` matches dev server URL
- [ ] Timeouts are sufficient
- [ ] Correct test directory specified
- [ ] No typos in configuration

#### 3. Use Debug Tools

- [ ] Run with `--debug` flag
- [ ] Use UI mode (`--ui` flag)
- [ ] Check screenshots in report
- [ ] Review video recordings
- [ ] Analyze trace files

#### 4. Review Test Code

- [ ] Selectors are correct
- [ ] Wait conditions present
- [ ] Assertions are valid
- [ ] No race conditions
- [ ] Proper async/await usage

### Debug Commands

```powershell
# Debug specific test
npx playwright test landing-page.spec.js --debug

# UI mode for visual debugging
npx playwright test --ui

# Run with verbose output
npx playwright test --reporter=list

# Generate trace on all tests
npx playwright test --trace on

# View specific trace
npx playwright show-trace trace.zip
```

---

## 📈 Performance Checklist

### Optimization Checks

- [ ] Tests run in parallel (not sequential)
- [ ] No unnecessary waits/timeouts
- [ ] Efficient selectors used
- [ ] Proper test isolation
- [ ] Resources cleaned up after tests
- [ ] Network requests mocked (if appropriate)

### Speed Targets

- [ ] Individual test: <30 seconds
- [ ] Page test suite: <2 minutes
- [ ] Full suite (single browser): <5 minutes
- [ ] Full suite (all browsers): <10 minutes

---

## 🎥 Trace Analysis Checklist

When reviewing traces for failed tests:

- [ ] Timeline shows all actions
- [ ] Screenshots at each step visible
- [ ] Network requests logged
- [ ] Console logs captured
- [ ] DOM snapshots available
- [ ] Timing information clear
- [ ] Error location identified

---

## ✅ Final Validation

### Before Moving to CI/CD

#### Test Quality

- [ ] All critical user journeys tested
- [ ] Error scenarios covered
- [ ] Happy paths validated
- [ ] Edge cases considered
- [ ] Mobile experience tested

#### Test Stability

- [ ] No flaky tests (run 3x to verify)
- [ ] Consistent results across runs
- [ ] No random failures
- [ ] Proper wait conditions
- [ ] Timeouts appropriate

#### Documentation

- [ ] Test plan documented
- [ ] Test results recorded
- [ ] Issues documented
- [ ] Workarounds noted
- [ ] Next steps identified

#### Code Quality

- [ ] Tests follow best practices
- [ ] Code is readable and maintainable
- [ ] No hardcoded values (use config)
- [ ] Proper error handling
- [ ] Comments for complex logic

---

## 🚦 Status Indicators

### Overall Status: ⚪ Not Started / 🟡 In Progress / 🟢 Complete / 🔴 Issues

- [ ] **Environment Setup**: ⚪
- [ ] **Configuration**: ⚪
- [ ] **Test Files**: ⚪
- [ ] **Smoke Tests**: ⚪
- [ ] **Individual Page Tests**: ⚪
- [ ] **Multi-Browser Tests**: ⚪
- [ ] **Mobile Tests**: ⚪
- [ ] **Debug & Fix**: ⚪
- [ ] **Reports Generated**: ⚪
- [ ] **Ready for CI/CD**: ⚪

---

## 📋 Issue Tracking

### Known Issues

| Issue | Test File | Status | Notes |
| ----- | --------- | ------ | ----- |
|       |           |        |       |
|       |           |        |       |
|       |           |        |       |

### Blocked Tests

| Test Name | Reason | Expected Resolution |
| --------- | ------ | ------------------- |
|           |        |                     |
|           |        |                     |

---

## 📚 Reference Commands

### Essential Commands

```powershell
# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run specific file
npx playwright test landing-page.spec.js

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run with UI mode
npx playwright test --ui

# Run specific browser
npx playwright test --project=chromium

# Show test report
npx playwright show-report

# View trace
npx playwright show-trace trace.zip

# List all tests
npx playwright test --list

# Run single test by name
npx playwright test -g "should load landing page"
```

### Useful Flags

```powershell
--headed            # Show browser window
--debug             # Debug mode with inspector
--ui                # Interactive UI mode
--project=NAME      # Run specific browser
--grep=PATTERN      # Run tests matching pattern
--reporter=TYPE     # html, list, json, junit
--workers=N         # Number of parallel workers
--retries=N         # Number of retries on failure
--timeout=MS        # Test timeout
--update-snapshots  # Update visual snapshots
--trace=on          # Enable tracing
```

---

## 🎯 Success Criteria

### ✅ Your E2E testing is ready when:

**Setup Complete**

- ✅ Playwright installed with all browsers
- ✅ Configuration file properly set up
- ✅ All test files created and in place
- ✅ Dev server auto-starts with tests

**Tests Passing**

- ✅ >95% of tests passing in all browsers
- ✅ All critical user journeys covered
- ✅ No flaky tests (consistent results)
- ✅ Execution time under 5 minutes

**Reports Available**

- ✅ HTML reports generating correctly
- ✅ Screenshots captured on failures
- ✅ Videos recorded for debugging
- ✅ Traces available for analysis

**Ready for Next Phase**

- ✅ Tests stable and repeatable
- ✅ Documentation complete
- ✅ Issues tracked and resolved
- ✅ Team trained on execution

---

## 🔄 Continuous Testing Workflow

```
Daily Workflow:
1. Pull latest code
2. npm install (if dependencies changed)
3. npm run dev (in background)
4. npm run test:e2e (run tests)
5. Review report
6. Fix any failures
7. Commit fixes
```

```
Before PR/Merge:
1. Run full test suite (all browsers)
2. Verify >95% pass rate
3. Check for flaky tests
4. Review execution time
5. Commit test updates
6. Include test results in PR
```

---

**Document Version**: 1.0  
**Last Updated**: October 9, 2025  
**Owner**: Development Team  
**Next Review**: After CI/CD Integration

---

## Quick Start for Today

```powershell
# 1. Install browsers (if not done)
npx playwright install

# 2. Start dev server
npm run dev

# 3. Open new terminal and run first test
npx playwright test landing-page.spec.js --headed

# 4. If successful, run all tests
npx playwright test

# 5. View results
npx playwright show-report
```

**Ready to start testing! 🚀**
