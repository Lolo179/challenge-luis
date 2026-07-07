# CI/CD Pipeline & Branch Protection

## Overview

This project uses GitHub Actions for automated testing and code quality checks. Branch protection rules ensure that only tested code can merge to `main`.

## Branch Protection Rules

**Main branch protection is enabled with:**

- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging:
  - `lint-and-test` job (ESLint + Unit Tests)
  - `e2e-tests` job (Playwright E2E tests)
  - `build` job (Production build verification)
- ✅ Require branches to be up to date before merging
- ✅ Dismiss stale pull request approvals

This ensures that **no code reaches main without passing all CI checks**.

## CI/CD Pipeline (`.github/workflows/ci.yml`)

### Jobs

#### 1. Lint & Unit Tests
- **Trigger:** Every push and PR
- **Node.js:** 24
- **Steps:**
  - ESLint checks (`npm run lint`)
  - Unit tests with Vitest (`npm run test -- --run`)
  - 24 unit tests must pass

#### 2. E2E Tests (Playwright)
- **Trigger:** Every push and PR
- **Browsers:** Chromium + Firefox
- **Steps:**
  - Install Playwright dependencies
  - Build app (`npm run build`)
  - Run E2E tests (`npx playwright test`)
  - Upload Playwright HTML report as artifact
  - 12 E2E tests must pass (6 per browser)

#### 3. Build
- **Trigger:** Every push and PR
- **Node.js:** 24
- **Steps:**
  - Production build verification (`npm run build`)
  - Validate `dist/` directory created

## Workflow

1. **Create Feature Branch:**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes** - Must pass:
   - ✅ ESLint rules
   - ✅ 24 unit tests
   - ✅ 12 E2E tests
   - ✅ Production build

3. **Push Changes:**
   ```bash
   git push origin feature/your-feature
   ```

4. **Create Pull Request** to `main`:
   - CI pipeline automatically runs
   - All checks must pass (green ✅)
   - Cannot merge until all jobs pass

5. **Code Review:**
   - At least 1 approval required
   - Branch must be up to date with main
   - Then merge to main

## Checking Pipeline Status

### In GitHub UI
1. Go to Pull Request
2. Scroll to "Checks" section
3. See real-time status of all jobs
4. Click job name to see logs

### Locally Before Push
Run checks before pushing:

```bash
# Run ESLint
npm run lint

# Run unit tests
npm run test -- --run

# Run E2E tests
npm run e2e

# Build for production
npm run build
```

If all commands pass locally, they should pass in CI too.

## Common Issues

### Build Fails in CI but Works Locally

- **Cause:** Node.js version mismatch
- **Solution:** Check `.github/workflows/ci.yml` for `node-version` (currently 24)
- **Fix:** `npm run build` should work locally with Node.js 24

### E2E Tests Fail in CI but Pass Locally

- **Cause:** Timing issues or missing dependencies
- **Solution:** Use generous timeouts (60s per test, 10s per action)
- **Check:** `playwright.config.js` has proper timeout settings

### ESLint Fails on Code

- **Cause:** Code doesn't match linting rules
- **Solution:** Run `npm run lint` locally, fix issues
- **Command:** ESLint config in `eslint.config.js`

## Viewing Test Reports

### Unit Test Results
- View in GitHub Actions log under "Run unit tests" step
- Shows: 24 tests passed ✅

### E2E Test Reports
- Download HTML report from "Artifacts" in GitHub Actions
- Reports include:
  - Test results with screenshots
  - Video recordings of failures (if configured)
  - Detailed error messages

### Build Size
- Check size of bundle in "Build" job step
- Current sizes:
  - `dist/assets/index-*.js`: ~76KB gzipped
  - `dist/assets/index-*.css`: ~1.45KB gzipped

## Rollback Procedure

If a bad commit reaches main:

1. Create new branch: `git checkout -b hotfix/revert-bad-commit`
2. Revert commit: `git revert <commit-hash>`
3. Push: `git push origin hotfix/revert-bad-commit`
4. Create PR and merge (after pipeline passes)

## Future Improvements

- [ ] Add code coverage reporting
- [ ] Add performance budget checks
- [ ] Add visual regression testing
- [ ] Automatic deployment to staging on PR
- [ ] Automatic deployment to production on main merge
- [ ] Slack notifications for pipeline status
