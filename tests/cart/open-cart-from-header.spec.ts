import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { CartPage } from '@pages/CartPage';

test('Verify user can open cart page from header cart icon', async ({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.header.openCart();
    await cartPage.waitForOpened();
    await expect(page).toHaveURL(/cart/);
})