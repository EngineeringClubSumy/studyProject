import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { CategoryPage } from '../../pages/CategoryPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';


test('Verify user can remove product from cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const categoryPage = new CategoryPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.open();
  await categoryPage.open();
  await categoryPage.waitForLoaded();
  await categoryPage.openFirstProduct();
  await productPage.waitForLoaded();
  await productPage.clickAddToCart();
  await productPage.waitForProductAddedToCart();

  await cartPage.open();

  await cartPage.waitForOpened();

  await expect(await cartPage.getProductNamesCount()).toBeGreaterThan(0);

  await cartPage.cartItem.clickRemove();

  await cartPage.waitForCartUpdatedAfterRemove();

  await expect(await cartPage.emptyCartBlock.getEmptyMessageText())
    .toBe('Your cart is currently empty.');
});