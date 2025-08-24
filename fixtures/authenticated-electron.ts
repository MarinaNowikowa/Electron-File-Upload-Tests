import { test as base } from './electron';
import { LoginPage } from '../pages/LoginPage';
import { ElectronApplication, Page } from '@playwright/test';

type AuthenticatedElectronFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<AuthenticatedElectronFixtures>({
  loginPage: async ({ window }, use) => {
    const loginPage = new LoginPage(window);
    await use(loginPage);
  },

  window: async ({ electronApp, window }, use) => {
    const loginPage = new LoginPage(window);
    await loginPage.login();
    await use(window);
  },
});

export const expect = test.expect;
