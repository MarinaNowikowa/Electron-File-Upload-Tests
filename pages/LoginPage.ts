import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  // Selectors
  private readonly selectors = {
    username: 'input[placeholder*="username" i]',
    password: 'input[type="password"]',
    loginButton: 'button:has-text("Login")'
  };

  constructor(private page: Page) {
    this.usernameInput = page.locator(this.selectors.username).first();
    this.passwordInput = page.locator(this.selectors.password).first();
    this.loginButton = page.locator(this.selectors.loginButton).first();
  }

  async login(username?: string, password?: string): Promise<void> {
    const loginUsername = username || process.env.APP_LOGIN;
    const loginPassword = password || process.env.APP_PASSWORD;

    if (!loginUsername || !loginPassword) {
      throw new Error('Login credentials not provided. Set APP_LOGIN and APP_PASSWORD in .env file or pass as parameters.');
    }

    await this.usernameInput.fill(loginUsername);
    await this.passwordInput.fill(loginPassword);
    await this.loginButton.click();
  }
}
