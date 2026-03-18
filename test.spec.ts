import { test, expect } from '@playwright/test';

test('Verify user can open cart page from header cart icon', async ({page}) => {
    await page.goto('/');
    await page.locator('a[class=cart-contents]').click();
    await expect(page).toHaveURL(/cart/);
});