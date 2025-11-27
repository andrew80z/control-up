import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Inventory page object for SauceDemo application
 * Simplified for focused UI testing
 */
export class InventoryPage extends BasePage {
  private readonly inventoryItems: Locator;
  private readonly shoppingCartBadge: Locator;
  private readonly addToCartButtons: Locator;

  constructor(page: Page) {
    super(page, '/inventory.html');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.addToCartButtons = page.locator('button:has-text("Add to cart")');
  }

  /**
   * Get total product count
   */
  async getTotalProductCount(): Promise<number> {
    const items = await this.inventoryItems.all();
    return items.length;
  }

  /**
   * Get shopping cart badge count
   */
  async getCartItemCount(): Promise<number> {
    try {
      const badgeText = await this.getText(this.shoppingCartBadge);
      return parseInt(badgeText) || 0;
    } catch {
      return 0;
    }
  }

  /**
   * Add first inventory item to cart
   */
  async addFirstItemToCart(): Promise<void> {
    const firstAddButton = this.addToCartButtons.first();
    await this.clickElement(firstAddButton);
  }
}