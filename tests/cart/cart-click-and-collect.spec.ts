import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { CategoryPage } from '@pages/CategoryPage';
import { ProductPage } from '@pages/ProductPage';
import { CartPage } from '@pages/CartPage';

test('Verify Click & Collect does not add extra shipping cost @ui @cart @regression', async ({ page }) => {
    const CLICK_AND_COLLECT_LABEL = 'Click & Collect'
    const EXPECTED_CLICK_AND_COLLECT_PRICE = 0;
   
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
    
    await test.step('Select Click & Collect and verify shipping cost is not added', async () => {
    const subtotal = await cartPage.getSubtotalValue();
    const clickAndCollectIndex = await cartPage.getShipmentRadioButtonIndexByLabel(CLICK_AND_COLLECT_LABEL);
    cartPage.verifyIndex(clickAndCollectIndex);

    await cartPage.clickShipmentRadioButtonByIndex(clickAndCollectIndex);
    await expect(cartPage.getShipmentRadioButtonByIndex(clickAndCollectIndex)).toBeChecked();

    const selectedShipmentPrice = await cartPage.getSelectedShipmentPrice();
    const total = await cartPage.getTotalValue();

    expect(selectedShipmentPrice).toBe(EXPECTED_CLICK_AND_COLLECT_PRICE);
    expect(total).toBe(subtotal);
    });
})