import{test, expect} from '@playwright/test'
import { HomePage } from '@pages/HomePage'
import { CategoryPage } from '@pages/CategoryPage'
import { ProductPage } from '@pages/ProductPage'
import { CartPage } from '@pages/CartPage'

test('Verify default shipping method is selected on Cart page', async ({page}) => {
    const EXPECTED_MIN_SHIPPING_METHODS_COUNT = 1;
    const EXPECTED_SELECTED_SHIPPING_METHODS_COUNT = 1;

    const homePage = new HomePage(page)
    const categoryPage = new CategoryPage(page)
    const productPage = new ProductPage(page)
    const cartPage = new CartPage(page)

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

    await expect(cartPage.getCartTotals()).toBeVisible();
    await expect(cartPage.getShipment()).toBeVisible();
    await expect(cartPage.getSubtotal()).toBeVisible();
    await expect(cartPage.getTotal()).toBeVisible();

    const shipmentMethodsCount = await cartPage.getShipmentRadioButtonsCount();
    expect(shipmentMethodsCount).toBeGreaterThanOrEqual(EXPECTED_MIN_SHIPPING_METHODS_COUNT);

    const checkedShipmentMethodsCount = await cartPage.getShipmentRadioButtonsCount(true);
    expect(checkedShipmentMethodsCount).toBe(EXPECTED_SELECTED_SHIPPING_METHODS_COUNT);

})

