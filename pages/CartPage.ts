import {Locator, Page} from '@playwright/test';
import { EmptyCartBlock } from '@components/EmptyCartBlock';
import { CartItem } from '@components/CartItem'; 


export class CartPage {
    readonly page: Page;
    readonly emptyCartBlock: EmptyCartBlock;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly productQuantities: Locator;
    readonly cartItems: Locator;
    readonly subtotal: Locator;
    readonly total: Locator
    readonly cartTotals: Locator;
    readonly shipment: Locator;
    readonly shipmentRadioButtonsClickCollect: Locator;
    readonly shipmentRadioButtonsCountyDublin: Locator;
    readonly shipmentRadioButtonsDublinDelivery: Locator;
    readonly shipmentRadioButtonsLeinsterAreas: Locator;
    readonly shipmentRadioButtonsNationwide: Locator;
    readonly shipmentRadioButtons: Locator


    constructor(page: Page) {
        this.page = page;
        this.emptyCartBlock = new EmptyCartBlock(page);
        this.cartItems = page.locator('.cart_item');
        this.productNames = page.locator('td[data-title="Product"] a');
        this.productPrices = page.locator('td[data-title="Price"]');
        this.productQuantities = page.locator('[aria-label="Product quantity"]');
        this.total = page.locator('tr[class="cart-subtotal"]')
        this.subtotal = page.locator('td[data-title="Total"]')
        this.cartTotals = page.locator('div[class="cart_totals "]');
        this.shipment = page.locator('tr[class="woocommerce-shipping-totals shipping"]');
        this.shipmentRadioButtons = page.locator('ul[id="shipping_method"] input[type="radio"]')
        this.shipmentRadioButtonsClickCollect = page.locator('input[id="shipping_method_0_local_pickup4"]');
        this.shipmentRadioButtonsCountyDublin = page.locator('input[id="shipping_method_0_flat_rate7"]');
        this.shipmentRadioButtonsDublinDelivery = page.locator('input[id="shipping_method_0_flat_rate6"]');
        this.shipmentRadioButtonsLeinsterAreas = page.locator('input[id="shipping_method_0_flat_rate8"]');
        this.shipmentRadioButtonsNationwide = page.locator('input[id="shipping_method_0_flat_rate9"]');
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
    
    async getShipmentRadioButtonsCount(checkedOnly = false): Promise<number> {
     const count = await this.shipmentRadioButtons.count();

     if (!checkedOnly) {
        return count;
     }

     let checkedCount = 0;

     for (let i = 0; i < count; i++) {
        const radioButton = this.shipmentRadioButtons.nth(i);

        if (await radioButton.isChecked()) {
            checkedCount++;
        }
     }

      return checkedCount;
    }


    //GET
    getUrl(): string {
        return this.page.url();
    }
    getCartItem(index: number): CartItem {
    return new CartItem(this.cartItems.nth(index));
    }
    getCartTotals(): Locator {
        return this.cartTotals
    }
    getShipment(): Locator {
        return this.shipment;
    }
    getShipmentRadioButtons(): Locator {
        return this.shipmentRadioButtons;
    }
    getSubtotal(): Locator {
        return this.subtotal;
    }
    getTotal(): Locator {
        return this.total;
    }

 
}