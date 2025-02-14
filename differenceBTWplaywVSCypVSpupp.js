// playwright
const { test, expect } = require('@playwright/test');

test('Mock a successful API response', async ({ page }) => {
  // Mock the API response
  await page.route('**/api/data', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: 'mocked response' }),
    });
  });

  // Navigate to the page
  await page.goto('https://example.com');

  // Click the button to trigger the API request
  await page.click('button#trigger-api');

  // Wait for the mocked data to appear
  await page.waitForSelector('.data-display');

  // Verify the mocked data
  const data = await page.textContent('.data-display');
  expect(data).toBe('mocked response');
});

// puppeteer

const puppeteer = require('puppeteer');

test('Mock a successful API response', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Enable request interception
  await page.setRequestInterception(true);

  // Mock the API response
  page.on('request', (request) => {
    if (request.url().includes('/api/data')) {
      request.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: 'mocked response' }),
      });
    } else {
      request.continue();
    }
  });

  // Navigate to the page
  await page.goto('https://example.com');

  // Click the button to trigger the API request
  await page.click('button#trigger-api');

  // Wait for the mocked data to appear
  await page.waitForSelector('.data-display');

  // Verify the mocked data
  const data = await page.$eval('.data-display', (el) => el.textContent);
  expect(data).toBe('mocked response');

  await browser.close();
});

// Cypress 

it('Mock a successful API response', () => {
  // Mock the API response
  cy.intercept('GET', '/api/data', {
    statusCode: 200,
    body: { data: 'mocked response' },
  }).as('getData');

  // Navigate to the page
  cy.visit('https://example.com');

  // Click the button to trigger the API request
  cy.get('button#trigger-api').click();

  // Wait for the mocked API response
  cy.wait('@getData');

  // Verify the mocked data
  cy.get('.data-display').should('contain', 'mocked response');
});