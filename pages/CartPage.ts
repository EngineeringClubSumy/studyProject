import {Locator, Page} from '@playwright/test';
import { EmptyCartBlock } from './components/EmptyCartBlock';
import { CartItem } from './components/CartItem'; 


export class CartPage {
    readonly page: Page;
    readonly emptyCartBlock: EmptyCartBlock;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly productQuantities: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emptyCartBlock = new EmptyCartBlock(page);
        this.cartItems = page.locator('.cart_item');
        this.productNames = page.locator('td[data-title="Product"] a');
        this.productPrices = page.locator('td[data-title="Price"]');
        this.productQuantities = page.locator('[aria-label="Product quantity"]');
    }

    async waitForOpened(): Promise<void> {
        await this.page.waitForURL('**/cart/**')
    }

    async open(): Promise<void> {
        await this.page.goto('/cart/')
    }

    async getFirstProductName(): Promise<string> {
        const text = await this.productNames.first().textContent();
        return text?.trim() || '';
    }
    async getFirstProductPrice(): Promise<string> {
        const text = await this.productPrices.first().textContent();
        return text?.trim() || '';
    }
    async getFirstProductQuantity(): Promise<string> {
        const value = await this.productQuantities.first().inputValue();
        return value.trim();
    }

    async getProductNamesCount(): Promise<number> {
    return await this.productNames.count();
    } 

    async waitForCartUpdatedAfterRemove(): Promise<void> {
    await this.emptyCartBlock.cartIsEmptyMessageElement.waitFor({ state: 'visible' });
    }
    getCartItem(): CartItem {
    return new CartItem(this.cartItems);
    }

    //GET
    getUrl(): string {
        return this.page.url();
    }
    getFirstCartItem(): CartItem {
    return new CartItem(this.cartItems.first());
}
}