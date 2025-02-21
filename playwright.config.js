// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

const config = defineConfig({
  testDir: './tests',
  fullyParallel: true,      // Disable parallel execution in CI
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 3,  // 3 workers locally, 1 in CI
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
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
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 }
      },
    }
  ]
});

module.exports = config;