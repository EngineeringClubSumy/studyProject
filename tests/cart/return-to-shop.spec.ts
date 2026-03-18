import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';
import { CategoryPage } from '../../pages/CategoryPage';

test('Verify user can return to shop from empty cart page', async ({page}) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const categoryPage = new CategoryPage(page);

    await homePage.open();
    await homePage.header.openCart();

    await cartPage.waitForOpened();
    await cartPage.emptyCartBlock.clickReturnToShop();
    await expect(page).not.toHaveURL(/cart/)

    await categoryPage.waitForLoaded();
    await expect(await categoryPage.getProdyctCardsCount()).toBeGreaterThan(0)
});