import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { CategoryPage } from '@pages/CategoryPage';
import { ProductPage } from '@pages/ProductPage';
import { CartPage } from '@pages/CartPage';

test('Verify total remains unchanged after changing shipping method @ui @cart @regression', async ({ page }) => {
    const MIN_SHIPPING_METHODS_COUNT = 2;

    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('Open product page and add product to cart', async () => {
        await homePage.open();

        await categoryPage.open();
        await categoryPage.waitForLoaded();
        await categoryPage.openFirstProduct();

        await productPage.waitForLoaded();
        await expect(productPage.addToCartButton).toBeVisible();
        await expect(productPage.addToCartButton).toBeEnabled();
        await productPage.clickAddToCart();
    });

    await test.step('Open cart page', async () => {
        await cartPage.open();
        await cartPage.waitForOpened();

        await expect(cartPage.getShipment()).toBeVisible();
        await expect(cartPage.getSubtotal()).toBeVisible();
        await expect(cartPage.getTotal()).toBeVisible();
    });

    await test.step('Verify total is recalculated after changing shipping method', async () => {
        const shipmentMethodsCount = await cartPage.getShipmentRadioButtonsCount();
        expect(shipmentMethodsCount).toBeGreaterThanOrEqual(MIN_SHIPPING_METHODS_COUNT);

        const subtotalBefore = await cartPage.getSubtotalValue();
        const totalBefore = await cartPage.getTotalValue();
        const initialSelectedIndex = await cartPage.getFirstCheckedShipmentRadioButtonIndex();

        expect(initialSelectedIndex).toBeGreaterThanOrEqual(0);

        const secondIndex = await cartPage.getAnotherShipmentRadioButtonIndex(initialSelectedIndex);
        expect(secondIndex).toBeGreaterThanOrEqual(0);

        await cartPage.clickShipmentRadioButtonByIndex(secondIndex);

        await expect(cartPage.getShipmentRadioButtonByIndex(secondIndex)).toBeChecked();

        const shipmentAfter = await cartPage.getSelectedShipmentPrice();
        const totalAfter = await cartPage.getTotalValue();

        expect(shipmentAfter).toBeGreaterThanOrEqual(0);
        expect(totalAfter).toBe(totalBefore);
    });

});