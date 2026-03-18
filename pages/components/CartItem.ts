import { Locator, Page } from '@playwright/test';

export class CartItem {
  readonly page: Page;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeButton = page.locator('.cart_item .remove').first();
  }

  async clickRemove(): Promise<void> {
    await this.removeButton.click();
  }
}