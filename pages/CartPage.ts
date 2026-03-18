import {Page} from '@playwright/test';
import { EmptyCartyBlock } from './components/EmptyCartBlock';

export class CartPage {
    readonly page: Page;
    readonly emptyCartBlock: EmptyCartyBlock;

    constructor(page: Page) {
        this.page = page
        this.emptyCartBlock = new EmptyCartyBlock(page);
    }

    async waitForOpened(): Promise<void> {
        await this.page.waitForURL('**/cart/**')
    }

    //GET
    getUrl(): string {
        return this.page.url();
    }
}