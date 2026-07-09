import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  use: {
    baseURL: 'http://localhost:4000',
    headless: true,
    trace: 'on-first-retry'
  },

  webServer: {
    command: 'npm start',
    url: 'http://localhost:4000',
    reuseExistingServer: true
  }
});
