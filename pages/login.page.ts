import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Login page object for SauceDemo application
 * Simplified for focused UI testing
 */
export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username, { clear: true });
    await this.fillInput(this.passwordInput, password, { clear: true });
    await this.clickElement(this.loginButton);
  }
}