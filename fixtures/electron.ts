import { test as base } from '@playwright/test';
import { _electron as electron, ElectronApplication, Page } from '@playwright/test';

type ElectronFixtures = {
  electronApp: ElectronApplication;
  window: Page;
};

export const test = base.extend<ElectronFixtures>({
  electronApp: async ({}, use) => {
    const appPath = '/Applications/QA Uploader.app/Contents/MacOS/QA Uploader';
    const electronApp = await electron.launch({ 
      executablePath: appPath,
      args: []
    });
    await use(electronApp);
    await electronApp.close();
  },
  
  window: async ({ electronApp }, use) => {
    const window = await electronApp.firstWindow();
    await use(window);
  },
});

export const expect = test.expect;
