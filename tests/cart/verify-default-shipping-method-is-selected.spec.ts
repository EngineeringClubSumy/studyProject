import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { CartPage } from '@pages/CartPage';
import { CategoryPage } from '@pages/CategoryPage';
import { ProductPage } from '@pages/ProductPage';


test('Verify only one shipping method can be selected at a time', async ({ page }) => {
    const EXPECTED_SELECTED_COUNT = 1;
    const MIN_SHIPPING_METHODS_COUNT = 2;
    const NO_INDEX = -1;

    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('Open product page', async () => {
        await homePage.open();
        await categoryPage.open();
        await categoryPage.waitForLoaded();
        await categoryPage.openFirstProduct();
    });

    await test.step('Add product to cart', async () => {
        await productPage.waitForLoaded();
        await expect(productPage.addToCartButton).toBeVisible();
        await expect(productPage.addToCartButton).toBeEnabled();

        await productPage.clickAddToCart();
        await productPage.waitForProductAddedToCart();
    });

    await test.step('Open cart page', async () => {
        await cartPage.open();
        await cartPage.waitForOpened();
    });

    await test.step('Verify core elements', async () => {
        await cartPage.checkVisibleCoreElements();
    });

    await test.step('Verify shipping methods selection logic', async () => {
        const count = await cartPage.getShipmentRadioButtonsCount();
        expect(count).toBeGreaterThanOrEqual(MIN_SHIPPING_METHODS_COUNT);

        const selectedIndex = await cartPage.getFirstCheckedShipmentRadioButtonIndex();
        expect(selectedIndex).not.toBe(NO_INDEX);

        const secondIndex = await cartPage.getAnotherShipmentRadioButtonIndex(selectedIndex);
        expect(secondIndex).not.toBe(NO_INDEX);

        await cartPage.clickShipmentRadioButtonByIndex(secondIndex);

        await expect(cartPage.getShipmentRadioButtonByIndex(secondIndex)).toBeChecked();
        expect(await cartPage.isShipmentRadioButtonCheckedByIndex(selectedIndex)).toBeFalsy();

        const checkedCount = await cartPage.getShipmentRadioButtonsCount(true);
        expect(checkedCount).toBe(EXPECTED_SELECTED_COUNT);
    });
});