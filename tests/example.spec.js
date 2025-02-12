const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Navigate to the base URL defined in playwright.config.js
  await page.goto('/');
});

test('Verify Playwright website title', async ({ page }) => {
  // Verify the title of the page
  const title = await page.title();
  expect(title).toContain('Fast and reliable end-to-end testing for modern web apps | Playwright');
});

test('Check Get Started button', async ({ page }) => {
  // Click the "Get Started" button
  await page.click('text=Get Started');

  // Wait for navigation to complete
  await page.waitForURL('**/docs/intro');

  // Verify the URL after clicking the button
  const url = page.url();
  expect(url).toContain('/docs/intro');
});