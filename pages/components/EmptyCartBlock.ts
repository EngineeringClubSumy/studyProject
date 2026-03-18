import { Locator, Page } from '@playwright/test';

export class EmptyCartBlock {
    readonly page: Page;
    readonly cartIsEmptyMessageElement: Locator;
    readonly returnToShopButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.cartIsEmptyMessageElement = page.locator('div[class="cart-empty woocommerce-info"]');
        this.returnToShopButton = page.locator('a[class="button wc-backward"]');
    }

    async getEmptyMessageText(): Promise<string> {
        const text = await this.cartIsEmptyMessageElement.textContent();
        return text?.trim() || '';

    }
    async isReturnToShopBuuttonVisible(): Promise<boolean> {
        return this.returnToShopButton.isVisible();
    }
    async clickReturnToShop(): Promise<void> {
        await this.returnToShopButton.click();
    }
}