import { Locator } from '@playwright/test';

export class CartItem {
  readonly root: Locator;
  readonly removeButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.removeButton = root.locator('.remove');
  }

  async clickRemove(): Promise<void> {
    await this.removeButton.click();
  }
}