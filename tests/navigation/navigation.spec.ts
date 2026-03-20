import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';

test('header navigation works', async ({ page }) => {
  const homePage = new HomePage(page);

  // 1. Open homepage
  await homePage.open();

  // Sofas
  await homePage.header.openSofas();
  await expect(page).toHaveURL(/sofas/i);
  await expect(page.locator('h1')).toContainText(/sofas/i);

  // Back to home
  await homePage.open();

  // Dining
  await homePage.header.openDining();
  await expect(page).toHaveURL(/dining/i);
  await expect(page.locator('h1')).toContainText(/dining/i);

  await homePage.open();

  // Beds
  await homePage.header.openBeds();
  await expect(page).toHaveURL(/bedding/i);
  await expect(page.locator('h1')).toContainText(/Bedding/i);

  await homePage.open();

  // Occasional
  await homePage.header.openOccasional();
  await expect(page).toHaveURL(/occasional/i);
  await expect(page.locator('h1')).toContainText(/occasional/i);

  await homePage.open();

  // Outdoor
  await homePage.header.openOutdoor();
  await expect(page).toHaveURL(/outdoor/i);
  await expect(page.locator('h1')).toContainText(/outdoor/i);
});