# Electron QA Uploader - Desktop Application Tests

This project contains automated tests for the Electron QA Uploader desktop application using TypeScript and Playwright 

## 📋 Prerequisites

Before running the tests, ensure you have:

1. **Node.js** (version 16 or higher)
2. **npm** package manager
3. **Electron QA Uploader desktop application** installed at `/Applications/QA Uploader.app/Contents/MacOS/QA Uploader`
4. **Git** (for cloning the repository)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file with your credentials/settings:

```bash
# Electron App Configuration
APP_PATH=path_to_your_local_Electron_app"

# Authentication
APP_LOGIN=your_login
APP_PASSWORD=your_pass

# Timeouts (optional - defaults provided)
GLOBAL_TIMEOUT=60000
ACTION_TIMEOUT=30000
NAVIGATION_TIMEOUT=30000
EXPECT_TIMEOUT=30000
```

### 3. Run the Tests

```bash
npm test
```

The test will:
- Launch the Electron application
- Automatically log in using credentials from `.env`
- Generate test files (`.txt` and `.json`)
- Simulate folder upload via native dialog mocking
- Validate upload results

## 🧪 Test Details

### Test Case: File Upload Workflow

**Objective**: Verify complete file upload functionality in the Electron desktop application.

**Test Steps**:
1. **Launch Electron App**: Automatically launches the QA Uploader application
2. **Authentication**: Logs in using credentials from `.env` file
3. **File Generation**: Creates random test files ('.txt', '.jpg', '.pdf', '.png', '.json') with random content
4. **Native Dialog Mocking**: Mocks the file selection dialog to return test folder
5. **Upload Process**: 
   - Opens upload dialog
   - Selects case folder
   - Fills case name
   - Submits upload
6. **Validation**: 
   - Waits for upload queue
   - Monitors upload progress
   - Validates upload history
   - Checks file size display
   