# Quick Start Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Install Playwright Browsers
```bash
npm run install:browsers
```

## Step 3: Run Tests
```bash
npm test
```

## Step 4: View HTML Report
```bash
npm run test:report
```

## Test Credentials (SauceDemo)
- **Valid User**: `standard_user` / `secret_sauce`
- **Locked Out User**: `locked_out_user` / `secret_sauce`
- **Invalid User**: Any other combination

## Project Structure Overview
- `pages/` - Page Object Model classes
- `tests/` - Test specifications
- `utils/` - Utilities (logger, test data)
- `logs/` - Generated log files
- `playwright-report/` - HTML test reports

## Common Commands
- `npm test` - Run all tests
- `npm run test:headed` - Run tests with visible browser
- `npm run test:ui` - Run tests in interactive UI mode
- `npm run test:debug` - Run tests in debug mode
- `npm run test:login` - Run only login tests
