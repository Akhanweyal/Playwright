// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,      // Disable parallel execution in CI
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 3,  // 3 workers locally, 1 in CI
  reporter: process.env.CI ? [['html'], ['list']] : 'html', // Better CI logging
  use: {
    baseURL: 'https://playwright.dev/',
    trace: 'on-first-retry',
    screenshot: 'on',       // Enable for CI debugging
    video: 'retain-on-failure',
    headless: process.env.CI ? true : false  // Headless in CI
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    }
  ]
});