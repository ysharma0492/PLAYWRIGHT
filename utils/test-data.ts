/**
 * Test data for SauceDemo login tests
 */
export const TestData = {
  // Valid credentials
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  
  // Invalid credentials for negative testing
  invalidUser: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
  
  // Locked out user
  lockedOutUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  
  // Empty credentials
  emptyCredentials: {
    username: '',
    password: '',
  },
  
  // Only username (no password)
  usernameOnly: {
    username: 'standard_user',
    password: '',
  },
  
  // Only password (no username)
  passwordOnly: {
    username: '',
    password: 'secret_sauce',
  },
  
  // Special characters
  specialCharsUser: {
    username: '!@#$%^&*()',
    password: '!@#$%^&*()',
  },
  
  // SQL injection attempt
  sqlInjection: {
    username: "' OR '1'='1",
    password: "' OR '1'='1",
  },
  
  // XSS attempt
  xssAttempt: {
    username: '<script>alert("xss")</script>',
    password: '<script>alert("xss")</script>',
  },
  
  // Expected error messages
  errorMessages: {
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
    requiredUsername: 'Epic sadface: Username is required',
    requiredPassword: 'Epic sadface: Password is required',
  },
  
  // Expected page titles and URLs
  expected: {
    loginPageTitle: 'Swag Labs',
    inventoryPageTitle: 'Swag Labs',
    inventoryUrl: '/inventory.html',
  },
};
