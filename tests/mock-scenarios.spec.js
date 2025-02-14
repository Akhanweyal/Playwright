const { test, expect } = require('@playwright/test');
const mockedResponse = require('../fixtures/mockresponse.json')
// import {mockPayload} from 'Data/mockpayload.json';

test.describe('Mocking Scenarios for Playwright Website', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Playwright website
    await page.goto('https://playwright.dev/');
  });

  test.only('Mock the search API response', async ({ page }) => {
    // Mock the Algolia search API response
    await page.route('**/indexes/*/queries**', (route) => {
      console.log('Mocked response:', JSON.stringify(mockedResponse));
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedResponse),
      });
    });

    // Open the search bar
    await page.click('.DocSearch-Button');


    // Type a search query
    await page.fill('.DocSearch-Input', 'mocked search');

    // Wait for the mocked search results to appear
    await page.waitForSelector('.DocSearch-Dropdown');

    // Take a screenshot for debugging
    await page.screenshot({ path: 'search-results.png' });

    // Verify the mocked search results
    const searchResults = await page.$$eval('.DocSearch-Hit', (elements) =>
      elements.map((el) => el.textContent.trim())
    );

    console.log('Search results:', searchResults);
    expect(searchResults[0]).toContain('Mocked Search Result 1');
    expect(searchResults[1]).toContain('Mocked Search Result 2');
  });

  test('Mock a delayed search API response', async ({ page }) => {
    // Mock the Algolia search API response with a delay
    await page.route('**/indexes/*/queries**', (route) => {
      const mockedResponse = {
        results: [
          {
            hits: [
              { title: 'Delayed Search Result', url: '/delayed-result' },
            ],
          },
        ],
      };
      console.log('Mocked delayed response:', JSON.stringify(mockedResponse));
      setTimeout(() => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockedResponse),
        });
      }, 2000); // Delay the response by 2 seconds
    });

    // Open the search bar
    await page.click('.DocSearch-Button');

    // Type a search query
    await page.fill('.DocSearch-Input', 'delayed search');

    // Wait for the delayed search results to appear
    await page.waitForSelector('.DocSearch-Dropdown');

    // Take a screenshot for debugging
    await page.screenshot({ path: 'delayed-search-results.png' });

    // Verify the delayed search result
    const searchResults = await page.$$eval('.DocSearch-Hit', (elements) =>
      elements.map((el) => el.textContent.trim())
    );

    console.log('Delayed search results:', searchResults);
    expect(searchResults).toContain('Delayed Search Result');
  });

  test('Mock an error response for the search API', async ({ page }) => {
    // Mock an error response for the Algolia search API
    await page.route('**/indexes/*/queries**', (route) => {
      const mockedResponse = { error: 'Search API Error' };
      console.log('Mocked error response:', JSON.stringify(mockedResponse));
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify(mockedResponse),
      });
    });

    // Open the search bar
    await page.click('.DocSearch-Button');

    // Type a search query
    await page.fill('.DocSearch-Input', 'error search');

    // Wait for the error message to appear
    await page.waitForSelector('.DocSearch-Error', { timeout: 5000 });

    // Take a screenshot for debugging
    await page.screenshot({ path: 'error-message.png' });

    // Verify the error message
    const errorMessage = await page.textContent('.DocSearch-Error');
    console.log('Error message:', errorMessage);
    expect(errorMessage).toBe('Search API Error');
  });
});