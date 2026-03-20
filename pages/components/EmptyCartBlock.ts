import { Locator, Page } from '@playwright/test';

export class EmptyCartBlock {
    private readonly page: Page;
    private readonly cartIsEmptyMessageElement: Locator;
    private readonly returnToShopButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIsEmptyMessageElement = page.locator('div[class="cart-empty woocommerce-info"]');
        this.returnToShopButton = page.locator('a[class="button wc-backward"]');
    }

    async getEmptyMessageText(): Promise<string> {
        const text = await this.cartIsEmptyMessageElement.textContent();
        return text?.trim() || '';
    }

    async isReturnToShopButtonVisible(): Promise<boolean> {
        return await this.returnToShopButton.isVisible();
    }

    async clickReturnToShop(): Promise<void> {
        await this.returnToShopButton.click();
    }
    async waitForEmptyMessageVisible(): Promise<void> {
    await this.cartIsEmptyMessageElement.waitFor({ state: 'visible' });
    }
}