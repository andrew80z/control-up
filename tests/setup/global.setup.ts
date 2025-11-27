import { test as setup, expect } from '@playwright/test';
import { TestUsers } from '../../data/users.data';

const authFile = 'playwright/.auth/user.json';

/**
 * Global setup for authentication
 * This runs before all other tests to create an authenticated state
 */
setup('authenticate', async ({ page }) => {
  // Navigate to login page
  await page.goto('/');
  
  // Perform login
  const standardUser = TestUsers.STANDARD_USER;
  if (!standardUser) {
    throw new Error('STANDARD_USER is not defined in TestUsers');
  }
  // Locators
  await page.locator('[data-test="username"]').fill(standardUser.username);
  await page.locator('[data-test="password"]').fill(standardUser.password);
  await page.locator('[data-test="login-button"]').click();
  
  // Wait for successful login
  await page.waitForURL('**/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');
  
  // Save authenticated state
  await page.context().storageState({ path: authFile });
});

/**
 * Global teardown - cleanup after all tests
 */
setup.afterAll(async ({ browser }) => {
  // Clean up any global resources
  await browser?.close();
});