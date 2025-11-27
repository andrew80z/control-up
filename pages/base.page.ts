import { Page, Locator } from '@playwright/test';

/**
 * Base page class that provides common functionality for all page objects
 * Simplified for focused testing
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  /**
   * Navigate to the page
   */
  async navigate(): Promise<void> {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Click element
   */
  async clickElement(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await locator.click();
  }

  /**
   * Fill input field
   */
  async fillInput(locator: Locator, text: string, options?: { clear?: boolean }): Promise<void> {
    await this.waitForElement(locator);
    if (options?.clear) {
      await locator.clear();
    }
    await locator.fill(text);
  }

  /**
   * Get text from element
   */
  async getText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    const textContent = await locator.textContent();
    return textContent || '';
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}