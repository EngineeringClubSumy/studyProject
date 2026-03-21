import { Locator, Page, expect } from '@playwright/test';
import { EmptyCartBlock } from '@components/EmptyCartBlock';
import { CartItem } from '@components/CartItem';

export class CartPage {
    readonly page: Page;
    readonly emptyCartBlock: EmptyCartBlock;

    private readonly productNames: Locator;
    private readonly productPrices: Locator;
    private readonly productQuantities: Locator;
    private readonly cartItems: Locator;
    private readonly subtotal: Locator;
    private readonly total: Locator;
    private readonly cartTotals: Locator;
    private readonly shipment: Locator;
    private readonly shipmentRadioButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emptyCartBlock = new EmptyCartBlock(page);

        this.cartItems = page.locator('.cart_item');
        this.productNames = page.locator('td[data-title="Product"] a');
        this.productPrices = page.locator('td[data-title="Price"]');
        this.productQuantities = page.locator('[aria-label="Product quantity"]');

        this.cartTotals = page.locator('div.cart_totals');
        this.shipment = page.locator('tr.woocommerce-shipping-totals.shipping');
        this.shipmentRadioButtons = page.locator('ul#shipping_method input[type="radio"]');

        this.subtotal = page.locator('tr.cart-subtotal');
        this.total = page.locator('tr.order-total');
    }


    verifyIndex(index: number): void {
    expect(index).toBeGreaterThanOrEqual(0);
}

    async waitForOpened(): Promise<void> {
        await this.page.waitForURL('**/cart/**');
    }

    async open(): Promise<void> {
        await this.page.goto('/cart/');
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

    async getShipmentRadioButtonsCount(checkedOnly = false): Promise<number> {
        const count = await this.shipmentRadioButtons.count();

        if (!checkedOnly) {
            return count;
        }

        let checkedCount = 0;

        for (let i = 0; i < count; i++) {
            if (await this.shipmentRadioButtons.nth(i).isChecked()) {
                checkedCount++;
            }
        }

        return checkedCount;
    }

    async checkVisibleCoreElements(): Promise<void> {
        await expect(this.cartTotals).toBeVisible();
        await expect(this.shipment).toBeVisible();
        await expect(this.subtotal).toBeVisible();
        await expect(this.total).toBeVisible();
        await expect(this.shipmentRadioButtons.first()).toBeVisible();
    }

    async getFirstCheckedShipmentRadioButtonIndex(): Promise<number> {
        const count = await this.shipmentRadioButtons.count();

        for (let i = 0; i < count; i++) {
            if (await this.shipmentRadioButtons.nth(i).isChecked()) {
                return i;
            }
        }

        return -1;
    }

    async getAnotherShipmentRadioButtonIndex(selectedIndex: number): Promise<number> {
        const count = await this.shipmentRadioButtons.count();

        for (let i = 0; i < count; i++) {
            if (i !== selectedIndex) {
                return i;
            }
        }

        return -1;
    }
    async getNextFreeButtonIndex(firstIndex: number, secondIndex: number): Promise<number> {
    const count = await this.shipmentRadioButtons.count();

    for (let i = 0; i < count; i++) {
        if (i !== firstIndex && i !== secondIndex) {
            return i;
        }
    }

    return -1;
    }
    

    async clickShipmentRadioButtonByIndex(index: number): Promise<void> {
        await this.shipmentRadioButtons.nth(index).check();
    }

    async isShipmentRadioButtonCheckedByIndex(index: number): Promise<boolean> {
        return await this.shipmentRadioButtons.nth(index).isChecked();
    }

    getUrl(): string {
        return this.page.url();
    }

    getCartItem(index: number): CartItem {
        return new CartItem(this.cartItems.nth(index));
    }

    getCartTotals(): Locator {
        return this.cartTotals;
    }

    getShipment(): Locator {
        return this.shipment;
    }

    getShipmentRadioButtons(): Locator {
        return this.shipmentRadioButtons;
    }

    getShipmentRadioButtonByIndex(index: number): Locator {
        return this.shipmentRadioButtons.nth(index);
    }

    getSubtotal(): Locator {
        return this.subtotal;
    }

    getTotal(): Locator {
        return this.total;
    }
}