import { Locator, Page } from '@playwright/test';

export class EmptyCartyBlock {
    readonly page: Page;
    readonly emptyMessage: Locator;
    readonly returnToShopButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.cartIsEmptyMessageElement = page.locator('div[class="cart-empty woocommerce-info"]');
        this.returnToShopButton = page.locator('a[class="button wc-backward"]');
    }

    async getEmptyMessageText(): Promise<string> {
        return await this.emptyMessage.textContent()?.trim()  || '';

    }
    async isReturnToShopBuuttonVisible(): Promise<boolean> {
        return this.returnToShopButton.isVisible();
    }
    async clickReturnToShop(): Promise<void> {
        await this.returnToShopButton.click();
    }
}