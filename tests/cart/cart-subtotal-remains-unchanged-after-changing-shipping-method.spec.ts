import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { CategoryPage } from '@pages/CategoryPage';
import { ProductPage } from '@pages/ProductPage';
import { CartPage } from '@pages/CartPage';

test('Verify subtotal remains unchanged when only shipping method is changed @ui @cart @regression', async ({ page }) => {
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

    const shipmentMethodsCount = await cartPage.getShipmentRadioButtonsCount();
    expect(shipmentMethodsCount).toBeGreaterThanOrEqual(MIN_SHIPPING_METHODS_COUNT);

    const subtotalBefore = await cartPage.getSubtotalValue();
    const totalBefore = await cartPage.getTotalValue();
    const shippingBefore = await cartPage.getSelectedShipmentPrice();
    const productPriceBefore = await cartPage.getFirstProductPrice();
    const productQuantityBefore = await cartPage.getFirstProductQuantity();

    const initiallySelectedIndex = await cartPage.getFirstCheckedShipmentRadioButtonIndex();
    expect(initiallySelectedIndex).toBeGreaterThanOrEqual(0);

    const secondIndex = await cartPage.getAnotherShipmentRadioButtonIndexWithDifferentPrice(initiallySelectedIndex);
    expect(secondIndex).toBeGreaterThanOrEqual(0);

    await test.step('Change shipping method and wait for totals update', async () => {
        await cartPage.clickShipmentRadioButtonByIndex(secondIndex);
        await expect(cartPage.getShipmentRadioButtonByIndex(secondIndex)).toBeChecked();
        await cartPage.waitForTotalValueToChange(totalBefore);
    });

    const subtotalAfter = await cartPage.getSubtotalValue();
    const totalAfter = await cartPage.getTotalValue();
    const shippingAfter = await cartPage.getSelectedShipmentPrice();
    const productPriceAfter = await cartPage.getFirstProductPrice();
    const productQuantityAfter = await cartPage.getFirstProductQuantity();

    await test.step('Verify subtotal remains unchanged', async () => {
        expect(subtotalAfter).toBe(subtotalBefore);
    });

    await test.step('Verify shipping and total are updated', async () => {
        expect(shippingAfter).not.toBe(shippingBefore);
        expect(totalAfter).not.toBe(totalBefore);
    });

    await test.step('Verify product values remain unchanged', async () => {
        expect(productPriceAfter).toBe(productPriceBefore);
        expect(productQuantityAfter).toBe(productQuantityBefore);
    });
});