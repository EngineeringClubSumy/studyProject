import {Locator, Page, expect} from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly cartIcon: Locator;
    
    readonly sofasLink: Locator;
    readonly diningLink: Locator;
    readonly bedsLink: Locator;
    readonly occasionalLink: Locator;
    readonly outdoorLink: Locator;



    constructor (page: Page) {
        this.page = page
        this.cartIcon = page.locator('a[class=cart-contents]');
        this.sofasLink = page.getByRole('link', { name: 'Sofas', exact: true });
        this.diningLink = page.getByRole('link', { name: 'Dining', exact: true });
        this.bedsLink = page.getByRole('link', { name: 'Beds', exact: true });
        this.occasionalLink = page.getByRole('link', { name: 'Occasional' }).first();
        this.outdoorLink = page.getByRole('link', { name: 'Outdoor' });
        
    }    
  async openCart(): Promise<void> {
    await this.cartIcon.waitFor({ state: 'attached' });
    await this.cartIcon.evaluate((el) => {(el as HTMLAnchorElement).click();});
  }
 
  async openSofas(): Promise<void> {
    await this.sofasLink.click();
  }

  async openDining(): Promise<void> {
    await this.diningLink.click();
  }

  async openBeds(): Promise<void> {
    await this.bedsLink.click();
  }

  async openOccasional(): Promise<void> {
    await this.occasionalLink.click();
  }

  async openOutdoor(): Promise<void> {
    await this.outdoorLink.click();
  }

}