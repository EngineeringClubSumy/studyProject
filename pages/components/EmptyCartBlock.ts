import { Locator, Page } from '@playwright/test';

export class EmptyCartyBlock {
    readonly page: Page;
    readonly emptyMessage: Locator;
    readonly returnToShopButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.emptyMessage = page.locator('div[class="cart-empty woocommerce-info"]');
        this.returnToShopButton = page.locator('a[class="button wc-backward"]');
    }

    async getEmptyMessageText(): Promise<string> {
        const text = await this.emptyMessage.textContent();
        return text?.trim() || '';
    }
    async isReturnToShopBuuttonVisible(): Promise<boolean> {
        return this.returnToShopButton.isVisible();
    }
}