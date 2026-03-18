import {Locator, Page} from '@playwright/test'

export class CategoryPage {
    readonly page: Page;
    readonly prodyctCardsShop: Locator;
    readonly firstProductLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.prodyctCardsShop = page.locator('.products .product')
        this.firstProductLink = page.locator('div[class="product-wrap"]').first()
    }

    async open(): Promise<void> {
        await this.page.goto('/product-category/sofas/')
    }

    async waitForLoaded(): Promise<void> {
        await this.prodyctCardsShop.first().waitFor({ state: 'visible' })
    }

    async getProdyctCardsCount(): Promise<number> {
        return await this.prodyctCardsShop.count();
    }

    async openFirstProduct(): Promise<void> {
        await this.firstProductLink.click()
    }
}