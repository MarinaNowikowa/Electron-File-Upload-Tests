import * as fs from 'fs-extra';
import * as path from 'path';
import os from 'os';

export type CreatedFiles = {
  folderPath: string;
  files: { fullPath: string; bytes: number }[];
  totalBytes: number;
};

export async function createRandomFilesInTemp(count = 2): Promise<CreatedFiles> {
  const folderPath = await fs.mkdtemp(path.join(os.tmpdir(), 'qa-uploader-'));
  const exts = ['.txt', '.jpg', '.pdf', '.png', '.json'];
  const files: { fullPath: string; bytes: number; ext: string }[] = [];
  let totalBytes = 0;

  for (let i = 0; i < count; i++) {
    const ext = exts[Math.floor(Math.random() * exts.length)];
    const fileName = `file-${Date.now()}-${i}${ext}`;
    const fullPath = path.join(folderPath, fileName);
    let buf: Buffer;
    if (ext === '.jpg' || ext === '.png') {
      buf = Buffer.from(Array.from({ length: 256 }, () => Math.floor(Math.random() * 256)));
    } else if (ext === '.pdf') {
      buf = Buffer.from(`%PDF-1.4\nrandom-${Math.random()}\n%%EOF`);
    } else if (ext === '.json') {
      buf = Buffer.from(JSON.stringify({ rnd: Math.random(), ts: new Date().toISOString() }));
    } else {
      buf = Buffer.from(`random-text-${Math.random()}-${new Date().toISOString()}`);
    }

    await fs.writeFile(fullPath, buf);
    files.push({ fullPath, bytes: buf.length, ext });
    totalBytes += buf.length;
  }

  return { folderPath, files, totalBytes };
}

export async function cleanupFolder(p: string) {
  await fs.remove(p).catch(() => {});
}

export class TestFileManager {
  private testFilesDir: string;
  private createdFiles: CreatedFiles | null = null;

  constructor(testFilesDir: string) {
    this.testFilesDir = testFilesDir;
  }

  async generateTestFiles(): Promise<void> {
    this.createdFiles = await createRandomFilesInTemp(2);
    console.log(`Generated ${this.createdFiles.files.length} files in: ${this.createdFiles.folderPath}`);
  }

  async cleanup(): Promise<void> {
    if (this.createdFiles) {
      await cleanupFolder(this.createdFiles.folderPath);
    }
  }

  getTestFilesDir(): string {
    return this.createdFiles?.folderPath || this.testFilesDir;
  }

  async getTotalSize(): Promise<string> {
    if (!this.createdFiles) {
      await this.generateTestFiles();
    }
    const bytes = this.createdFiles!.totalBytes;
    if (bytes < 1024) {
      return `${bytes}B`;
    } else {
      const sizeInKB = (bytes / 1024).toFixed(2);
      return `${sizeInKB}KB`;
    }
  }

  async getFileCount(): Promise<number> {
    if (!this.createdFiles) {
      await this.generateTestFiles();
    }
    return this.createdFiles!.files.length;
  }

  async getExpectedUploadText(): Promise<string> {
    const fileCount = await this.getFileCount();
    return `${fileCount} Collections`;
  }
}
