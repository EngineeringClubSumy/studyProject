import {Page} from '@playwright/test';

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async waitForOpened(): Promise<void> {
        await this.page.waitForURL('**/cart/**')
    }

    //GET
    getUrl(): string {
        return this.page.url();
    }
}