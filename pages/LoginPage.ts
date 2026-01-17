import { Page, Locator, expect } from '@playwright/test';
import { logger } from '../utils/logger';

/**
 * LoginPage class implementing Page Object Model pattern
 * Contains all elements and methods related to the login page
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginContainer: Locator;
  readonly botImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginContainer = page.locator('.login_container');
    this.botImage = page.locator('.bot_column');
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    logger.info('Navigating to login page');
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Wait for the login page to be fully loaded
   */
  async waitForPageLoad() {
    logger.debug('Waiting for login page to load');
    await this.page.waitForLoadState('networkidle');
    await expect(this.loginContainer).toBeVisible();
    logger.info('Login page loaded successfully');
  }

  /**
   * Enter username in the username field
   * @param username - The username to enter
   */
  async enterUsername(username: string) {
    logger.debug(`Entering username: ${username}`);
    await this.usernameInput.fill(username);
    logger.info(`Username entered: ${username}`);
  }

  /**
   * Enter password in the password field
   * @param password - The password to enter
   */
  async enterPassword(password: string) {
    logger.debug('Entering password (masked for security)');
    await this.passwordInput.fill(password);
    logger.info('Password entered');
  }

  /**
   * Click the login button
   */
  async clickLoginButton() {
    logger.info('Clicking login button');
    await this.loginButton.click();
    logger.info('Login button clicked');
  }

  /**
   * Perform complete login action
   * @param username - The username to login with
   * @param password - The password to login with
   */
  async login(username: string, password: string) {
    logger.step(1, `Logging in with username: ${username}`);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    logger.info('Login action completed');
  }

  /**
   * Verify that the user is on the login page
   */
  async verifyLoginPage() {
    logger.debug('Verifying login page elements');
    await expect(this.page).toHaveTitle(/Swag Labs/);
    await expect(this.loginContainer).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    logger.info('Login page verified successfully');
  }

  /**
   * Verify error message is displayed
   * @param expectedMessage - The expected error message
   */
  async verifyErrorMessage(expectedMessage: string) {
    logger.debug(`Verifying error message: ${expectedMessage}`);
    await expect(this.errorMessage).toBeVisible();
    const actualMessage = await this.errorMessage.textContent();
    expect(actualMessage).toContain(expectedMessage);
    logger.info(`Error message verified: ${expectedMessage}`);
  }

  /**
   * Verify that error message is not displayed
   */
  async verifyNoErrorMessage(){
    logger.debug('Verifying no error message is displayed');
    await expect(this.errorMessage).not.toBeVisible();
    logger.info('No error message displayed (as expected)');
  }

  /**
   * Verify successful login by checking URL and page title
   */
  async verifySuccessfulLogin(){
    logger.debug('Verifying successful login');
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.page).toHaveTitle(/Swag Labs/);
    logger.info('Login successful - redirected to inventory page');
  }

  /**
   * Verify that user is still on login page (failed login)
   */
  async verifyStillOnLoginPage() {
    logger.debug('Verifying user is still on login page');
    await expect(this.page).toHaveURL(/.*\/$/);
    await expect(this.loginContainer).toBeVisible();
    logger.info('User is still on login page (login failed)');
  }

  /**
   * Clear username field
   */
  async clearUsername() {
    logger.debug('Clearing username field');
    await this.usernameInput.clear();
  }
  
  /**
   * Clear password field
   */
  async clearPassword() {
    logger.debug('Clearing password field');
    await this.passwordInput.clear();
  }

  /**
   * Clear both username and password fields
   */
  async clearFields() {
    logger.debug('Clearing all input fields');
    await this.clearUsername();
    await this.clearPassword();
  }

  /**
   * Get the current error message text
   * @returns The error message text
   */
  async getErrorMessage() {
    logger.debug('Getting error message text');
  
    if (!(await this.errorMessage.isVisible())) return null;
  
    const message = await this.errorMessage.textContent();
    logger.info(`Error message: ${message}`);
    return message;
  }
  
  /**
   * Check if error message is visible
   * @returns True if error message is visible, false otherwise
   */
  async isErrorMessageVisible(){
    return await this.errorMessage.isVisible();
  }
}
