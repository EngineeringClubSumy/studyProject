import {Locator, Page} from '@playwright/test'

export class CategoryPage {
    readonly page: Page;
    readonly productCardsShop: Locator;
    readonly firstProductLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCardsShop = page.locator('.products .product')
        this.firstProductLink = page.locator('div[class="product-wrap"]').first()
    }

    async open(): Promise<void> {
        await this.page.goto('/product-category/sofas/')
    }

    async waitForLoaded(): Promise<void> {
        await this.productCardsShop.first().waitFor({ state: 'visible' })
    }

    async getProdyctCardsCount(): Promise<number> {
        return await this.productCardsShop.count();
    }

    async openFirstProduct(): Promise<void> {
        await this.firstProductLink.click()
    }
}