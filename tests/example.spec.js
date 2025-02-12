const { test, expect } = require('@playwright/test');

test('Verify Playwright website title', async ({ page }) => {
  // Navigate to the Playwright website
  await page.goto('https://playwright.dev/');

  // Verify the title of the page
  const title = await page.title();
  expect(title).toBe('Fast and reliable end-to-end testing for modern web apps | Playwright');
  await page.waitForTimeout(5000);
});

test('Check Get Started button', async ({ page }) => {
  // Navigate to the Playwright website
  await page.goto('https://playwright.dev/');

  // Click the "Get Started" button
  await page.click('text=Get Started');
  await page.waitForTimeout(5000);
  // Verify the URL after clicking the button
  const url = page.url();
  expect(url).toContain('/docs/intro');
  await page.waitForTimeout(5000);
});