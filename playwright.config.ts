import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  timeout: process.env.GLOBAL_TIMEOUT ? parseInt(process.env.GLOBAL_TIMEOUT) : 60000,
  expect: {
    timeout: process.env.EXPECT_TIMEOUT ? parseInt(process.env.EXPECT_TIMEOUT) : 30000,
  },
  
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: process.env.ACTION_TIMEOUT ? parseInt(process.env.ACTION_TIMEOUT) : 30000,
    navigationTimeout: process.env.NAVIGATION_TIMEOUT ? parseInt(process.env.NAVIGATION_TIMEOUT) : 30000,
  },
  
  projects: [
    {
      name: 'electron',
    },
  ],
});
