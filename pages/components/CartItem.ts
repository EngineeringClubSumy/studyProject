import { Locator } from '@playwright/test';

export class CartItem {
    private readonly root: Locator;
    private readonly removeButton: Locator;

    constructor(root: Locator) {
        this.root = root;
        this.removeButton = root.locator('.remove');
    }

    async clickRemove(): Promise<void> {
        await this.removeButton.click();
    }
}