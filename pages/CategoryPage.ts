import {Locator, Page} from '@playwright/test'

export class CategoryPage {
    readonly page: Page;
    readonly prodyctCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.prodyctCards = page.locator('div[class="post-area col span_9 col_last"]')
    }

    async waitForLoaded(): Promise<void> {
        await this.prodyctCards.first().waitFor({ state: 'visible' })
    }
    async getProdyctCardsCount(): Promise<number> {
        return await this.prodyctCards.count();
    }
}