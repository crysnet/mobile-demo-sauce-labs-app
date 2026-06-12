# Mobile Demo App - Appium + WebdriverIO

This project contains automated tests for Sauce Labs' MyDemoApp application using **Appium** and **WebdriverIO**.

---

## Prerequisites

Before running the tests, ensure you have the following installed and configured:

### 1. Node.js & npm

- **Version**: Node.js 18+ (recommended: 20 or 22)
- **Download**: https://nodejs.org/
- **Verify installation**:
  ```bash
  node --version
  npm --version
  ```

### 2. Appium

- **Installation**:
  ```bash
  npm install -g appium@latest
  ```
- **Verify installation**:
  ```bash
  appium --version
  ```
- **Note**: The project is configured to use a globally installed Appium server running on port 4723.

### 3. Mobile Platform Setup

#### For Android:

- **Java JDK 11+**: Required for Android development
  - Download: https://adoptium.net/
  - Set `JAVA_HOME` environment variable
- **Android Studio**: With SDK Platform Tools
  - Download: https://developer.android.com/studio
  - Set `ANDROID_HOME` environment variable
  - Install SDK Platform for Android 14.0 (API 34)
  - Create an emulator (e.g., Pixel 8) or connect a real device

#### For iOS (macOS only):

- **Xcode 15+**: Required for iOS development
  - Download from Mac App Store
  - Install Xcode Command Line Tools:
    ```bash
    xcode-select --install
    ```
- **iOS Simulator**: Create an iPhone 17 simulator with iOS 17.0+
- **CocoaPods**: For iOS dependencies
  ```bash
  sudo gem install cocoapods
  ```

### 4. Appium Drivers

Install the required Appium drivers:

```bash
# Install UiAutomator2 driver (Android)
appium driver install uiautomator2

# Install XCUITest driver (iOS - macOS only)
appium driver install xcuitest
```

### 5. App Binaries

Place your app files in the `apps/` directory:

- **Android**: `.apk` file
- **iOS**: `.app` or `.ipa` file

### 6. Environment Variables

Create a `.env` file in the project root (use `.env.example` as reference):

```env
# Android
ANDROID_APP_PATH=./apps/your-app.apk
ANDROID_APP_PACKAGE=com.saucelabs.mydemoapp.android

# iOS
IOS_APP_PATH=./apps/your-app.app
IOS_APP_BUNDLE_ID=com.saucelabs.mydemoapp.ios
```

---

## Project Structure

```
├── config/               # Platform-separated configurations
│   ├── wdio.shared.conf.ts      # Shared configuration
│   ├── wdio.android.conf.ts     # Android configuration
│   └── wdio.ios.conf.ts         # iOS configuration
├── tests/
│   ├── pageobjects/      # Page Object Model (POM)
│   └── specs/            # Tests
├── support/              # Helpers
└── package.json
```

## Installation

```bash
pnpm install
```

## Commands to run the tests

### Run the suite by platform (Android or iOS)

```bash
# Android - All tests
pnpm run wdio:android

# iOS - Only @ios tagged tests
pnpm run wdio:ios
```

### Run tests filtered by tags/grep (using Mocha's grep option)

```bash
# Android - Run tests with tag @products
pnpm run wdio:android -- --mochaOpts.grep="@products"

# Android - Run specific test case (e.g., TC01)
pnpm run wdio:android -- --mochaOpts.grep="@TC01"
```

## View Allure report

```bash
# Make sure Allure is installed globally:
pnpm install -g allure
```

The test automatically generates an Allure results, which is saved in the `allure-results` folder
You can view the report by running the following command:

```bash
# View the report in a browser
allure serve allure-results
```

## References

- [Project Documentation](docs/README.md)
- [Improvements for a more robust automation project](docs/improvements-for-robust-automation.md)
- [Mobile Demo App - Android](https://github.com/saucelabs/my-demo-app-android)
- [Mobile Demo App - iOS](https://github.com/saucelabs/my-demo-app-ios)
