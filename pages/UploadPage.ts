import { Page, Locator } from '@playwright/test';

export class UploadPage {
  private uploadArea: Locator;
  private selectCaseFolderButton: Locator;
  private caseNameInput: Locator;
  private submitButton: Locator;
  private uploadQueue: Locator;
  private uploadHistory: Locator;

  private readonly selectors = {
    uploadArea: 'button, div[role="button"], [class*="upload"]',
    selectCaseFolder: 'text=Select case folder',
    caseName: 'Case Name',
    submitButton: 'button[type="submit"]',
    uploadQueue: 'text=1 Upload Queue',
    uploadProgress: 'text=/Collections/',
    uploadHistory: 'text=TEST UPLOAD'
  };

  private readonly testData = {
    caseName: 'TEST UPLOAD'
  };

  constructor(private page: Page) {
    this.uploadArea = page.locator(this.selectors.uploadArea).first();
    this.selectCaseFolderButton = page.locator(this.selectors.selectCaseFolder).first();
    this.caseNameInput = page.getByLabel(this.selectors.caseName).first();
    this.submitButton = page.locator(this.selectors.submitButton).first();
    this.uploadQueue = page.locator(this.selectors.uploadQueue).first();
    this.uploadHistory = page.locator(this.selectors.uploadHistory).first();
  }

  async openUploadDialog(): Promise<void> {
    await this.uploadArea.click();
  }

  async selectCaseFolder(folderPath: string): Promise<void> {
    await this.selectCaseFolderButton.click();
  }

  async fillCaseName(caseName?: string): Promise<void> {
    const name = caseName || this.testData.caseName;
    await this.caseNameInput.fill(name);
  }

  async submitUpload(): Promise<void> {
    await this.submitButton.click();
  }

  async waitForUploadQueue(): Promise<void> {
    await this.uploadQueue.waitFor({ state: 'visible' });
  }

  async waitForUploadProgress(expectedText: string): Promise<void> {
    const progressElement = this.page.locator(`text=/${expectedText}/`).first();
    await progressElement.waitFor({ state: 'visible' });
  }

  async waitForUploadHistory(): Promise<void> {
    await this.uploadHistory.waitFor({ state: 'visible' });
  }

  async validateFileSize(expectedSize: string): Promise<void> {
    const sizeElement = this.page.locator(`text=/${expectedSize}/`).first();
    await sizeElement.waitFor({ state: 'visible' });
  }
}
