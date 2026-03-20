import {test, expect} from '@playwright/test'
import { HomePage } from '@pages/HomePage'
import { CategoryPage } from '@pages/CategoryPage'
import { ProductPage } from '@pages/ProductPage'
import { CartPage } from '@pages/CartPage'

test('Verify user can add product to cart from product page',async ({page}) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const expectedQuantity = '1';

    await homePage.open();
    await categoryPage.open();

    await categoryPage.waitForLoaded();
    await categoryPage.openFirstProduct();
    await categoryPage.waitForLoaded();

    const productName = await productPage.getProductName();
    const productPrice = await productPage.getProductPrice();

    await expect(productPage.getAddToCartButton()).toBeVisible();
    await expect(productPage.getAddToCartButton()).toBeEnabled();

    await productPage.clickAddToCart();
    await productPage.waitForProductAddedToCart();

    await cartPage.open();
    await cartPage.waitForOpened();

    const cartProductName = await cartPage.getFirstProductName();
    const cartProductPrice = await cartPage.getFirstProductPrice();
    const cartQuantity = await cartPage.getFirstProductQuantity();

    await expect(cartProductName).toBe(productName);
    await expect(cartProductPrice).toContain(productPrice);
    await expect(cartQuantity).toBe(expectedQuantity);

})