import { Locator, Page } from '@playwright/test';

export class Header {
    private readonly page: Page;
    private readonly cartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('a.cart-contents');
    }

    async openCart(): Promise<void> {
        await this.cartIcon.waitFor({ state: 'attached' });
        await this.cartIcon.evaluate((el) => {
            (el as HTMLAnchorElement).click();
        });
    }
}