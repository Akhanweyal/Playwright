const { test, expect } = require('@playwright/test');
const Response = require('../fixtures/mockResponse.json'); // Load the mock response JSON file

test.describe('Mocking Scenarios for Playwright Website', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Playwright website
    await page.goto('https://playwright.dev/');
  });

  test('Mock the search API response', async ({ page }) => {
    // Mock the Algolia search API response using fixture data
    await page.route('**/indexes/*/queries**', (route) => {
      console.log('Mocked response:', JSON.stringify(Response.success));
      route.fulfill({
        status: Response.success.status,
        contentType: 'application/json',
        body: JSON.stringify(Response.success.body),
      });
    });

    // Open the search bar
    await page.click('.DocSearch-Button');

    // Type a search query
    await page.fill('.DocSearch-Input', 'mocked search');

    // Wait for the mocked search results to appear
    await page.waitForSelector('.DocSearch-Dropdown');

    // Add a delay for debugging (remove this in production)
    await page.waitForTimeout(2000);

    // Take a screenshot for debugging
    await page.screenshot({ path: 'search-results.png' });

    // Verify the mocked search results
    const searchResults = await page.$$eval('.DocSearch-Hit', (elements) =>
      elements.map((el) => el.textContent.trim())
    );

    console.log('Search results:', searchResults);

    // Check if searchResults array is empty
    if (searchResults.length === 0) {
      console.error('No search results found. Check the selectors or mocked response.');
    } else {
      expect(searchResults[0]).toContain('Mocked Search Result 1');
      expect(searchResults[1]).toContain('Mocked Search Result 2');
    }
  });

  test('Mock a delayed search API response', async ({ page }) => {
    // Mock the Algolia search API response with a delay using the "delayed" scenario
    await page.route('**/indexes/*/queries**', (route) => {
      console.log('Mocked delayed response:', JSON.stringify(Response.delayed));
      setTimeout(() => {
        route.fulfill({
          status: Response.delayed.status,
          contentType: 'application/json',
          body: JSON.stringify(Response.delayed.body),
        });
      }, 2000); // Delay the response by 2 seconds
    });

    // Open the search bar
    await page.click('.DocSearch-Button');

    // Type a search query
    await page.fill('.DocSearch-Input', 'delayed search');

    // Wait for the delayed search results to appear
    await page.waitForSelector('.DocSearch-Dropdown');

    // Add a delay for debugging (remove this in production)
    await page.waitForTimeout(2000);

    // Take a screenshot for debugging
    await page.screenshot({ path: 'delayed-search-results.png' });

    // Verify the delayed search result
    const searchResults = await page.$$eval('.DocSearch-Hit', (elements) =>
      elements.map((el) => el.textContent.trim())
    );

    console.log('Delayed search results:', searchResults);

    // Check if searchResults array is empty
    if (searchResults.length === 0) {
      console.error('No search results found. Check the selectors or mocked response.');
    } else {
      expect(searchResults[0]).toContain('Delayed Search Result');
    }
  });

  test('Mock an error response for the search API', async ({ page }) => {
    // Mock an error response for the Algolia search API
    await page.route('**/indexes/*/queries**', (route) => {
      console.log('Mocked error response:', JSON.stringify(Response.error));
      route.fulfill({
        status: Response.error.status,
        contentType: 'application/json',
        body: JSON.stringify(Response.error.body),
      });
    });

    // Open the search bar
    await page.click('.DocSearch-Button');

    // Type a search query
    await page.fill('.DocSearch-Input', 'error search');

    // Wait for the error message to appear
    await page.waitForSelector('.DocSearch-Error', { state: 'visible', timeout: 10000 }); // Increased timeout

    // Take a screenshot for debugging
    await page.screenshot({ path: 'error-message.png' });

    // Verify the error message
    const errorMessage = await page.textContent('.DocSearch-Error');
    console.log('Error message:', errorMessage);
    expect(errorMessage).toBe('Search API Error');
  });
});