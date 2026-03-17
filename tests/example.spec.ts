import { test, expect } from '@playwright/test';

test('home page has Playwright title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Playwright/);
});
