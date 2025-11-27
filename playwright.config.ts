import { defineConfig, devices } from '@playwright/test';
import { BaseUrls } from './data/api.data';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: 'html',
  use: {
    baseURL: BaseUrls.SAUCEDEMO,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: null
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--start-maximized']
        }
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        launchOptions: {
          args: ['--start-maximized']
        }
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari']
        // WebKit doesn't support --start-maximized
      },
    },
    {
      name: 'edge',
      use: { 
        ...devices['Desktop Edge'],
        launchOptions: {
          args: ['--start-maximized']
        }
      },
    },
  ],
});
