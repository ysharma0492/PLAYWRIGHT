import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TestData } from '../utils/test-data';
import { logger } from '../utils/logger';

/**
 * Login Test Suite for SauceDemo
 * Contains both positive and negative test cases
 */
test.describe('SauceDemo Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.verifyLoginPage();
  });

  test.describe('Positive Test Cases', () => {
    test('TC001: Should successfully login with valid credentials', async ({ page }) => {
      logger.testStart('TC001: Successful login with valid credentials');
      
      logger.step(1, 'Enter valid username and password');
      await loginPage.login(TestData.validUser.username, TestData.validUser.password);
      
      logger.step(2, 'Verify successful login and navigation to inventory page');
      await loginPage.verifySuccessfulLogin();
      
      logger.step(3, 'Verify no error message is displayed');
      await loginPage.verifyNoErrorMessage();
      
      logger.testEnd('TC001: Successful login with valid credentials', 'PASSED');
    });

    test('TC002: Should successfully login and verify inventory page elements', async ({ page }) => {
      logger.testStart('TC002: Login and verify inventory page');
      
      logger.step(1, 'Login with valid credentials');
      await loginPage.login(TestData.validUser.username, TestData.validUser.password);
      
      logger.step(2, 'Verify URL contains inventory');
      await expect(page).toHaveURL(/.*inventory.html/);
      
      logger.step(3, 'Verify page title');
      await expect(page).toHaveTitle(/Swag Labs/);
      
      logger.step(4, 'Verify inventory container is visible');
      const inventoryContainer = page.locator('[data-test="inventory-container"]').first();
      await expect(inventoryContainer).toBeVisible();
      
      logger.testEnd('TC002: Login and verify inventory page', 'PASSED');
    });

    test('TC003: Should handle login with username containing special characters', async ({ page }) => {
      logger.testStart('TC003: Login with special characters in username');
      
      // Note: This will likely fail, but it's a valid test case
      logger.step(1, 'Attempt login with special characters');
      await loginPage.login(TestData.specialCharsUser.username, TestData.specialCharsUser.password);
      
      logger.step(2, 'Verify error message is displayed');
      await loginPage.verifyStillOnLoginPage();
      const errorVisible = await loginPage.isErrorMessageVisible();
      expect(errorVisible).toBeTruthy();
      
      logger.testEnd('TC003: Login with special characters in username', 'PASSED');
    });
  });

  test.describe('Negative Test Cases', () => {
    test('TC004: Should display error message for invalid username', async ({ page }) => {
      logger.testStart('TC004: Login with invalid username');
      
      logger.step(1, 'Enter invalid username and valid password');
      await loginPage.login(TestData.invalidUser.username, TestData.validUser.password);
      
      logger.step(2, 'Verify error message is displayed');
      await loginPage.verifyErrorMessage(TestData.errorMessages.invalidCredentials);
      
      logger.step(3, 'Verify user is still on login page');
      await loginPage.verifyStillOnLoginPage();
      
      logger.testEnd('TC004: Login with invalid username', 'PASSED');
    });

    test('TC005: Should display error message for invalid password', async ({ page }) => {
      logger.testStart('TC005: Login with invalid password');
      
      logger.step(1, 'Enter valid username and invalid password');
      await loginPage.login(TestData.validUser.username, TestData.invalidUser.password);
      
      logger.step(2, 'Verify error message is displayed');
      await loginPage.verifyErrorMessage(TestData.errorMessages.invalidCredentials);
      
      logger.step(3, 'Verify user is still on login page');
      await loginPage.verifyStillOnLoginPage();
      
      logger.testEnd('TC005: Login with invalid password', 'PASSED');
    });

    test('TC006: Should display error message for invalid username and password', async ({ page }) => {
      logger.testStart('TC006: Login with invalid username and password');
      
      logger.step(1, 'Enter invalid username and invalid password');
      await loginPage.login(TestData.invalidUser.username, TestData.invalidUser.password);
      
      logger.step(2, 'Verify error message is displayed');
      await loginPage.verifyErrorMessage(TestData.errorMessages.invalidCredentials);
      
      logger.step(3, 'Verify user is still on login page');
      await loginPage.verifyStillOnLoginPage();
      
      logger.testEnd('TC006: Login with invalid username and password', 'PASSED');
    });

    test('TC007: Should display error message for locked out user', async ({ page }) => {
      logger.testStart('TC007: Login with locked out user');
      
      logger.step(1, 'Enter locked out user credentials');
      await loginPage.login(TestData.lockedOutUser.username, TestData.lockedOutUser.password);
      
      logger.step(2, 'Verify specific locked out error message');
      await loginPage.verifyErrorMessage(TestData.errorMessages.lockedOut);
      
      logger.step(3, 'Verify user is still on login page');
      await loginPage.verifyStillOnLoginPage();
      
      logger.testEnd('TC007: Login with locked out user', 'PASSED');
    });

    test('TC008: Should display error message when username is empty', async ({ page }) => {
      logger.testStart('TC008: Login with empty username');
      
      logger.step(1, 'Enter only password (leave username empty)');
      await loginPage.login(TestData.passwordOnly.username, TestData.passwordOnly.password);
      
      logger.step(2, 'Verify username required error message');
      await loginPage.verifyErrorMessage(TestData.errorMessages.requiredUsername);
      
      logger.step(3, 'Verify user is still on login page');
      await loginPage.verifyStillOnLoginPage();
      
      logger.testEnd('TC008: Login with empty username', 'PASSED');
    });

    test('TC009: Should display error message when password is empty', async ({ page }) => {
      logger.testStart('TC009: Login with empty password');
      
      logger.step(1, 'Enter only username (leave password empty)');
      await loginPage.login(TestData.usernameOnly.username, TestData.usernameOnly.password);
      
      logger.step(2, 'Verify password required error message');
      await loginPage.verifyErrorMessage(TestData.errorMessages.requiredPassword);
      
      logger.step(3, 'Verify user is still on login page');
      await loginPage.verifyStillOnLoginPage();
      
      logger.testEnd('TC009: Login with empty password', 'PASSED');
    });

    test('TC010: Should display error message when both fields are empty', async ({ page }) => {
      logger.testStart('TC010: Login with empty username and password');
      
      logger.step(1, 'Click login button without entering any credentials');
      await loginPage.clickLoginButton();
      
      logger.step(2, 'Verify username required error message (first validation)');
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain(TestData.errorMessages.requiredUsername);
      
      logger.step(3, 'Verify user is still on login page');
      await loginPage.verifyStillOnLoginPage();
      
      logger.testEnd('TC010: Login with empty username and password', 'PASSED');
    });

    test('TC011: Should handle SQL injection attempt', async ({ page }) => {
      logger.testStart('TC011: Login with SQL injection attempt');
      
      logger.step(1, 'Attempt login with SQL injection payload');
      await loginPage.login(TestData.sqlInjection.username, TestData.sqlInjection.password);
      
      logger.step(2, 'Verify error message is displayed (should not allow SQL injection)');
      await loginPage.verifyStillOnLoginPage();
      const errorVisible = await loginPage.isErrorMessageVisible();
      expect(errorVisible).toBeTruthy();
      
      logger.step(3, 'Verify user is still on login page');
      await loginPage.verifyStillOnLoginPage();
      
      logger.testEnd('TC011: Login with SQL injection attempt', 'PASSED');
    });

    test('TC012: Should handle XSS attempt', async ({ page }) => {
      logger.testStart('TC012: Login with XSS attempt');
      
      logger.step(1, 'Attempt login with XSS payload');
      await loginPage.login(TestData.xssAttempt.username, TestData.xssAttempt.password);
      
      logger.step(2, 'Verify error message is displayed (should not execute XSS)');
      await loginPage.verifyStillOnLoginPage();
      const errorVisible = await loginPage.isErrorMessageVisible();
      expect(errorVisible).toBeTruthy();
      
      logger.step(3, 'Verify user is still on login page');
      await loginPage.verifyStillOnLoginPage();
      
      logger.testEnd('TC012: Login with XSS attempt', 'PASSED');
    });

    test('TC013: Should clear error message after entering valid credentials', async ({ page }) => {
      logger.testStart('TC013: Error message clears after valid login attempt');
      
      logger.step(1, 'Attempt login with invalid credentials');
      await loginPage.login(TestData.invalidUser.username, TestData.invalidUser.password);
      
      logger.step(2, 'Verify error message is displayed');
      await loginPage.verifyErrorMessage(TestData.errorMessages.invalidCredentials);
      
      logger.step(3, 'Clear fields and enter valid credentials');
      await loginPage.clearFields();
      await loginPage.login(TestData.validUser.username, TestData.validUser.password);
      
      logger.step(4, 'Verify successful login (error message should be gone)');
      await loginPage.verifySuccessfulLogin();
      await loginPage.verifyNoErrorMessage();
      
      logger.testEnd('TC013: Error message clears after valid login attempt', 'PASSED');
    });

    test('TC014: Should verify login button is enabled and clickable', async ({ page }) => {
      logger.testStart('TC014: Verify login button state');
      
      logger.step(1, 'Verify login button is visible');
      await expect(loginPage.loginButton).toBeVisible();
      
      logger.step(2, 'Verify login button is enabled');
      await expect(loginPage.loginButton).toBeEnabled();
      
      logger.step(3, 'Verify login button text or value');
      // Login button can be either input[type="submit"] with value attribute or button with textContent
      const tagName = await loginPage.loginButton.evaluate(el => el.tagName.toLowerCase());
      let buttonLabel = '';
      
      if (tagName === 'input') {
        buttonLabel = await loginPage.loginButton.getAttribute('value') || '';
      } else {
        buttonLabel = await loginPage.loginButton.textContent() || '';
      }
      
      // Verify button has "Login" text (case insensitive)
      expect(buttonLabel.trim().toLowerCase()).toContain('login');
      
      logger.testEnd('TC014: Verify login button state', 'PASSED');
    });

    test('TC015: Should verify input fields are present and functional', async ({ page }) => {
      logger.testStart('TC015: Verify input fields functionality');
      
      logger.step(1, 'Verify username field is visible and enabled');
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.usernameInput).toBeEnabled();
      
      logger.step(2, 'Verify password field is visible and enabled');
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeEnabled();
      
      logger.step(3, 'Verify password field type is password');
      const passwordType = await loginPage.passwordInput.getAttribute('type');
      expect(passwordType).toBe('password');
      
      logger.step(4, 'Test typing in username field');
      await loginPage.enterUsername('test_user');
      const usernameValue = await loginPage.usernameInput.inputValue();
      expect(usernameValue).toBe('test_user');
      
      logger.step(5, 'Clear username field');
      await loginPage.clearUsername();
      const clearedUsername = await loginPage.usernameInput.inputValue();
      expect(clearedUsername).toBe('');
      
      logger.testEnd('TC015: Verify input fields functionality', 'PASSED');
    });
  });
});
