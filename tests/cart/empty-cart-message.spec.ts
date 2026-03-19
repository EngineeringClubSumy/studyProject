import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { CartPage } from '@pages/CartPage';

test('Verify empty cart message is displayed when cart has no products', async ({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.header.openCart();
    await cartPage.waitForOpened();
    
    await expect(await cartPage.emptyCartBlock.getEmptyMessageText()).toBe('Your cart is currently empty.');

    await expect(await cartPage.emptyCartBlock.isReturnToShopBuuttonVisible()).toBeTruthy()
})