const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Navigate to the base URL defined in playwright.config.js
  await page.goto('/');
});

test('Verify page title and header', async ({ page }) => {
  // Verify the title of the page
  const title = await page.title();
  expect(title).toContain('Fast and reliable end-to-end testing for modern web apps | Playwright');

  // Verify the header text
  const header = await page.textContent('h1');
  expect(header).toContain('Playwright enables reliable end-to-end testing for modern web apps.');
});

test.only('Fill out a form and submit', async ({ page }) => {
    // Navigate to the Playwright docs page
    await page.goto('/docs/intro');
  
    // Click the search button to open the search input field
    await page.click("span.DocSearch-Button-Placeholder");
  
    // Wait for the search input field to be visible
    const searchInput = await page.waitForSelector('input.DocSearch-Input');
  
    // Fill out the search input field
    await searchInput.fill('locators', { force: true });
  
    // Press Enter to submit the search
    await searchInput.press('Enter');
  
    // Wait for the search results to load
    await page.waitForSelector('.DocSearch-Dropdown');
  
    // Verify that the search results contain the expected text
    const searchResults = await page.textContent('.DocSearch-Dropdown');
    expect(searchResults).toContain('locators');
  });

test('Handle a dialog box', async ({ page }) => {
  // Navigate to a page with a dialog (e.g., a page with a JavaScript alert)
  await page.goto('https://example.com'); // Replace with a page that triggers a dialog

  // Listen for the dialog event
  page.on('dialog', async (dialog) => {
    // Verify the dialog message
    expect(dialog.message()).toBe('This is an alert!');

    // Accept the dialog (click "OK")
    await dialog.accept();
  });

  // Trigger the dialog (e.g., by clicking a button)
  await page.click('button#trigger-alert'); // Replace with a valid selector
});

test('Take a screenshot and generate a PDF', async ({ page, browserName }) => {
  // Skip PDF generation in non-Chromium browsers or headed mode
  test.skip(browserName !== 'chromium', 'PDF generation is only supported in Chromium');

  // Navigate to the Playwright homepage
  await page.goto('/');

  // Take a screenshot of the entire page
  await page.screenshot({ path: 'ScreenShots', fullPage: true });

  // Generate a PDF of the page (only in headless Chromium)
  await page.pdf({ path: 'page.pdf' });
});

test('Intercept and mock a network request', async ({ page }) => {
  // Intercept a network request
  await page.route('**/api/data', (route) => {
    // Mock the response
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: 'mocked data' }),
    });
  });

  // Navigate to a page that makes the API request
  await page.goto('/data-page'); // Replace with a valid page URL

  // Wait for the mocked data to be displayed
  await page.waitForSelector('.data-display');

  // Verify that the mocked data is displayed
  const data = await page.textContent('.data-display');
  expect(data).toBe('mocked data');
});