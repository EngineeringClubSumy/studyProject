import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { CategoryPage } from '@pages/CategoryPage';
import { ProductPage } from '@pages/ProductPage';
import { CartPage } from '@pages/CartPage';

test('Verify only one shipping method can be selected at a time', async ({ page }) => {
    const EXPECTED_SELECTED_SHIPPING_METHODS_COUNT = 1;
    const MIN_SHIPPING_METHODS_COUNT = 2;
    const NO_INDEX_FOUND = -1;

    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.open();

    await categoryPage.open();
    await categoryPage.waitForLoaded();
    await categoryPage.openFirstProduct();

    await productPage.waitForLoaded();
    await expect(productPage.getAddToCartButton()).toBeVisible();
    await expect(productPage.getAddToCartButton()).toBeEnabled();
    await productPage.clickAddToCart();

    await cartPage.open();
    await cartPage.waitForOpened();

    await expect(cartPage.getShipment()).toBeVisible();

    const shipmentMethodsCount = await cartPage.getShipmentRadioButtonsCount();
    expect(shipmentMethodsCount).toBeGreaterThanOrEqual(MIN_SHIPPING_METHODS_COUNT);

    const initiallyCheckedCount = await cartPage.getShipmentRadioButtonsCount(true);
    expect(initiallyCheckedCount).toBe(EXPECTED_SELECTED_SHIPPING_METHODS_COUNT);

    const initiallySelectedIndex = await cartPage.getFirstCheckedShipmentRadioButtonIndex();
    expect(initiallySelectedIndex).not.toBe(NO_INDEX_FOUND);

    const secondIndex = await cartPage.getAnotherShipmentRadioButtonIndex(initiallySelectedIndex);
    expect(secondIndex).not.toBe(NO_INDEX_FOUND);

    await cartPage.clickShipmentRadioButtonByIndex(secondIndex);

    await expect(cartPage.getShipmentRadioButtonByIndex(secondIndex)).toBeChecked();
    expect(await cartPage.isShipmentRadioButtonCheckedByIndex(initiallySelectedIndex)).toBeFalsy();

    const checkedAfterSecondSelection = await cartPage.getShipmentRadioButtonsCount(true);
    expect(checkedAfterSecondSelection).toBe(EXPECTED_SELECTED_SHIPPING_METHODS_COUNT);

    if (shipmentMethodsCount >= 3) {
        const thirdIndex = await cartPage.getThirdShipmentRadioButtonIndex(initiallySelectedIndex, secondIndex);
        expect(thirdIndex).toBeGreaterThanOrEqual(0);

        await cartPage.clickShipmentRadioButtonByIndex(thirdIndex);

        await expect(cartPage.getShipmentRadioButtonByIndex(thirdIndex)).toBeChecked();
        expect(await cartPage.isShipmentRadioButtonCheckedByIndex(secondIndex)).toBeFalsy();

        const checkedAfterThirdSelection = await cartPage.getShipmentRadioButtonsCount(true);
        expect(checkedAfterThirdSelection).toBe(EXPECTED_SELECTED_SHIPPING_METHODS_COUNT);
    }
});