import { test, expect } from '../fixtures/authenticated-electron';
import * as path from 'path';
import { TestFileManager} from '../utils/test-helpers';
import { UploadPage } from '../pages/UploadPage';

test.describe('Electron QA Uploader - File Upload Tests', () => {
  let testFileManager: TestFileManager;

  test.beforeAll(async () => {
    const testFilesDir = path.join(__dirname, '..', 'test-files');
    testFileManager = new TestFileManager(testFilesDir);
    await testFileManager.generateTestFiles();
  });

  test('should upload files successfully', async ({ window, electronApp }) => {
    const uploadPage = new UploadPage(window);
    const totalSize = await testFileManager.getTotalSize();
    const expectedUploadText = await testFileManager.getExpectedUploadText();
    const folderPath = testFileManager.getTestFilesDir();

    await electronApp.evaluate(({ dialog }, folderPath) => {
      dialog.showOpenDialog = async () => {
        return {
          canceled: false,
          filePaths: [folderPath],
        } as any;
      };
    }, folderPath);

    await uploadPage.openUploadDialog();
    await uploadPage.selectCaseFolder(folderPath);
    await uploadPage.fillCaseName();
    await uploadPage.submitUpload();

    await uploadPage.waitForUploadQueue();
    await uploadPage.waitForUploadProgress(expectedUploadText);
    await uploadPage.waitForUploadHistory();
    await uploadPage.validateFileSize(totalSize);
  });

  test.afterAll(async () => {
    await testFileManager.cleanup();
  });
});
