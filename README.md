# Mobile Demo App - Appium + WebdriverIO

This project contains automated tests for Sauce Labs' MyDemoApp application using **Appium** and **WebdriverIO**.

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
pnpm wdio:android

# iOS - All tests
pnpm wdio:ios
```

### Run tests filtered by tags/grep (using Mocha's grep option)

```bash
# Android - Run tests with tag @products
pnpm wdio:android --mochaOpts.grep="@products"

# iOS - Run tests with tag @products
pnpm wdio:ios --mochaOpts.grep="@products"
```

## View Allure report

```bash
# Make sure Allure is installed globally:
npm install -g allure
```

The test automatically generates an Allure results, which is saved in the `allure-results` folder
You can view the report by running the following command:

```bash
# View the report in a browser
allure serve allure-results
```
