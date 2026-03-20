import { Locator, Page } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;
    private readonly productName: Locator;
    private readonly productPrice: Locator;
    private readonly addToCartButton: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('h1.product_title.entry-title');
        this.productPrice = page.locator('.summary .price ins .woocommerce-Price-amount');
        this.addToCartButton = page.locator('button[name="add-to-cart"]');
        this.successMessage = page.locator('.woocommerce-message');
    }

    async waitForLoaded(): Promise<void> {
        await this.productName.waitFor({ state: 'visible' });
    }

    async getProductName(): Promise<string> {
        const text = await this.productName.textContent();
        return text?.trim() || '';
    }

    async getProductPrice(): Promise<string> {
        const text = await this.productPrice.textContent();
        return text?.trim() || '';
    }

    getAddToCartButton(): Locator {
        return this.addToCartButton;
    }

    async isAddToCartButtonVisible(): Promise<boolean> {
        return await this.addToCartButton.isVisible();
    }

    async isAddToCartButtonEnabled(): Promise<boolean> {
        return await this.addToCartButton.isEnabled();
    }

    async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    async waitForProductAddedToCart(): Promise<void> {
        await this.successMessage.waitFor({ state: 'visible' });
    }
}