import {Locator, Page} from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly cartIcon: Locator;


    constructor (page: Page) {
        this.page = page
        this.cartIcon = page.locator('a[class=cart-contents]');
    }

    
  async openCart(): Promise<void> {
    await this.cartIcon.waitFor({ state: 'attached' });
    await this.cartIcon.evaluate((el) => {(el as HTMLAnchorElement).click();});
  }
}