const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Directory where tests are located
  fullyParallel: false, // Run tests in parallel
  forbidOnly: !!process.env.CI, // Fail the build on CI if test.only is used
  retries: process.env.CI ? 2 : 0, // Retry tests on CI
  workers: process.env.CI ? 1 : undefined, // Opt out of parallel tests on CI
  reporter: 'html', // Use the HTML reporter
  use: {
    baseURL: 'https://playwright.dev/', // Base URL for all tests
    trace: 'on-first-retry', // Collect traces when retrying failed tests
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});