# Playwright TypeScript Automation Framework

A professional Playwright automation framework built with TypeScript, implementing the Page Object Model (POM) pattern. This framework includes comprehensive logging, HTML reporting, and test cases for SauceDemo login functionality.

## 🏗️ Project Structure

```
BASICS/
├── pages/                  # Page Object Model classes
│   └── LoginPage.ts       # Login page object with all methods
├── tests/                  # Test files
│   └── login.spec.ts      # Login test cases (positive & negative)
├── utils/                  # Utility functions
│   ├── logger.ts          # Comprehensive logging utility
│   └── test-data.ts       # Test data constants
├── config/                 # Configuration files (if needed)
├── logs/                   # Generated log files
├── playwright-report/      # HTML test reports
├── test-results/          # Test execution results
├── allure-results/        # Allure test results (raw data)
├── allure-report/         # Generated Allure HTML report
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npm run install:browsers
   ```
   Or use the npm script:
   ```bash
   npx playwright install
   ```

## 📝 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run only login tests
```bash
npm run test:login
```

### Run login tests in headed mode
```bash
npm run test:login:headed
```

## 📊 Viewing Reports

### HTML Report (Playwright)
After running tests, view the HTML report:
```bash
npm run test:report
```

This will open the HTML report in your default browser, showing:
- Test execution summary
- Passed/Failed tests
- Screenshots for failed tests
- Video recordings for failed tests
- Test execution timeline

### Allure Report
Generate and view the Allure report:

1. **Generate Allure report:**
   ```bash
   npm run allure:generate
   ```

2. **Open Allure report in browser:**
   ```bash
   npm run allure:open
   ```

3. **Serve Allure report (auto-opens in browser):**
   ```bash
   npm run allure:serve
   ```

4. **Run tests and generate Allure report in one command:**
   ```bash
   npm run test:allure
   ```

The Allure report provides:
- Beautiful interactive dashboard
- Test execution history and trends
- Detailed test case information
- Attachments (screenshots, videos)
- Test categories and behaviors
- Timeline visualization
- Environment information

## 🧪 Test Cases

### Positive Test Cases
1. **TC001**: Successful login with valid credentials
2. **TC002**: Login and verify inventory page elements
3. **TC003**: Handle login with special characters in username

### Negative Test Cases
4. **TC004**: Error message for invalid username
5. **TC005**: Error message for invalid password
6. **TC006**: Error message for invalid username and password
7. **TC007**: Error message for locked out user
8. **TC008**: Error message when username is empty
9. **TC009**: Error message when password is empty
10. **TC010**: Error message when both fields are empty
11. **TC011**: Handle SQL injection attempt
12. **TC012**: Handle XSS attempt
13. **TC013**: Error message clears after entering valid credentials
14. **TC014**: Verify login button is enabled and clickable
15. **TC015**: Verify input fields are present and functional

## 📋 Features

### Page Object Model (POM)
- Clean separation of page logic and test logic
- Reusable page methods
- Easy maintenance and updates

### Comprehensive Logging
- Console logging with colors
- File logging to `logs/` directory
- Step-by-step test execution logging
- Test start/end logging

### HTML Reporting
- Beautiful HTML reports with screenshots
- Video recordings for failed tests
- Test execution timeline
- Multiple report formats (HTML, JSON, JUnit)

### Test Configuration
- Configurable for multiple browsers (Chrome, Firefox, Safari)
- Retry mechanism for flaky tests
- Screenshot and video capture on failure
- Configurable timeouts

### Allure Reporting
- Professional Allure test reports
- Interactive dashboards and visualizations
- Test history and trends
- Detailed test case information
- Attachments and screenshots

## 🔧 Configuration

### Playwright Configuration
Edit `playwright.config.ts` to customize:
- Browsers to test against
- Test timeout values
- Retry count
- Screenshot/video settings
- Base URL

### Test Data
Edit `utils/test-data.ts` to update:
- Test credentials
- Expected error messages
- Test data for various scenarios

## 📁 Logs

All test execution logs are saved in the `logs/` directory with timestamps. Each test run creates a new log file.

## 🎯 Best Practices Implemented

1. **Page Object Model**: All page interactions are abstracted into page classes
2. **Reusable Methods**: Common actions are encapsulated in page methods
3. **Comprehensive Logging**: Every action is logged for debugging
4. **Test Data Separation**: Test data is separated from test logic
5. **Descriptive Test Names**: Clear test case naming convention
6. **Error Handling**: Proper error verification in negative test cases
7. **Security Testing**: Includes SQL injection and XSS test cases

## 🐛 Debugging

### Debug Mode
Run tests in debug mode to step through execution:
```bash
npm run test:debug
```

### View Logs
Check the `logs/` directory for detailed execution logs.

### Screenshots and Videos
Failed tests automatically capture:
- Screenshots (saved in `test-results/`)
- Video recordings (saved in `test-results/`)

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [SauceDemo Website](https://www.saucedemo.com)

## 🤝 Contributing

When adding new tests:
1. Create page objects in `pages/` directory
2. Add test data in `utils/test-data.ts`
3. Write test cases in `tests/` directory
4. Follow the existing naming conventions

## 📄 License

ISC

---

**Happy Testing! 🚀**
