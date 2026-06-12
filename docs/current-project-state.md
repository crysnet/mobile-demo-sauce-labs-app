# Current Project State: What's Implemented

## Project Overview

This is a mobile test automation project for the **Sauce Labs Demo App** using **WebdriverIO + Appium + Mocha + TypeScript**. It's designed for cross-platform testing on both Android and iOS devices.

---

## Tech Stack

| Technology               | Version/Purpose                        |
| ------------------------ | -------------------------------------- |
| **Programming Language** | TypeScript (with strict mode enabled)  |
| **Test Framework**       | WebdriverIO v9.28                      |
| **Test Runner**          | Mocha (BDD style)                      |
| **Mobile Automation**    | Appium                                 |
| **Drivers**              | UiAutomator2 (Android), XCUITest (iOS) |
| **Reporter**             | Spec (console) + Allure                |
| **Code Formatter**       | Prettier                               |

---

## Project Structure Explained

```
mobile-demo-sauce-labs-app/
├── apps/                          # Mobile app binaries (APK for Android, .app for iOS)
│   └── .keep                      # Placeholder file
├── config/                        # Configuration files
│   ├── wdio.shared.conf.ts       # Shared WebdriverIO config
│   ├── wdio.android.conf.ts      # Android-specific config
│   └── wdio.ios.conf.ts          # iOS-specific config
├── docs/                          # Documentation
├── support/                       # Utilities and helpers
│   ├── helpers.ts                # Teardown function to restart app
│   └── locator-strategy.ts       # Cross-platform locator helpers
└── tests/
    ├── screen-objects/            # Page Object Model (POM) files
    │   ├── base-page.ts          # Empty base class (ready for wrappers!)
    │   ├── cart.screen.ts        # Cart screen POM
    │   ├── login.screen.ts       # Login screen POM
    │   ├── product-details.screen.ts  # Product Details screen POM
    │   └── product.screen.ts     # Products screen POM
    └── specs/                     # Test specifications
        ├── cart.spec.ts          # Cart feature tests (TC03, TC04)
        └── products.spec.ts      # Products feature tests (TC01, TC02)
```

---

## What's Already Implemented

### 1. Page Object Model (POM)

All screens are organized into page object classes with clear separation between **locators** and **methods**.

**Example from `product.screen.ts`:**

```typescript
class ProductScreen {
  // Locators section
  get productsTitle() {
    /* ... */
  }
  get productsList() {
    /* ... */
  }

  // Methods section
  async assertProductsScreenIsVisible() {
    /* ... */
  }
  async openProductDetailPage(name: string) {
    /* ... */
  }
}
```

### 2. Cross-Platform Locator Strategy

The project has a smart `locator-strategy.ts` that automatically selects the correct locator for Android or iOS.

**Key Functions:**

- `getElementById()`: Uses `resourceId` for Android, `accessibility id` for iOS
- `getElementByXPath()`: Generic XPath for both
- `getElementByText()`: Uses `UiSelector.text()` for Android, text attribute for iOS

### 3. Test Cases (4 Automated Scenarios)

The project has 4 fully functional test cases:

| TC # | Feature  | Scenario                                          | Tags                   |
| ---- | -------- | ------------------------------------------------- | ---------------------- |
| TC01 | Products | Launch app and verify products screen is visible  | @products, @TC01       |
| TC02 | Products | Verify user can add a product to the cart         | @products, @ios, @TC02 |
| TC03 | Cart     | Verify user starts checkout and login is required | @cart, @TC03           |
| TC04 | Cart     | Verify user can remove a product from the cart    | @cart, @TC04           |

### 4. Allure Reporting Integration

- Uses `@wdio/allure-reporter`
- Tests are wrapped with `step()` functions for better reporting
- Results saved to `allure-results/` directory

### 5. Teardown Function

The `teardown()` helper in `helpers.ts` restarts the app after each test to ensure a clean state:

```typescript
export const teardown = async () => {
  // Terminates and reactivates the app
}
```

### 6. Environment Variables Support

Uses `.env` file (with `.env.example`) for configuration.

**Required Env Vars:**

- `ANDROID_APP_PATH`: Path to Android APK
- `ANDROID_APP_PACKAGE`: Android app package
- `IOS_APP_PATH`: Path to iOS .app
- `IOS_APP_BUNDLE_ID`: iOS bundle ID

### 7. Prettier for Code Formatting

Prettier is configured with:

- Single quotes
- No semicolons
- 120 characters print width
- 2-space indentation

### 8. TypeScript with Strict Mode

`tsconfig.json` has strict mode enabled:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- Path aliases configured (`@/`, `@/screenObjects/`, `@/support/`)

### 9. WebdriverIO Configuration

**Shared Config (`wdio.shared.conf.ts`):**

- Local runner
- Port 4723 (Appium default)
- Specs: `tests/specs/**/*.spec.ts`
- Mocha timeout: 60 seconds
- Allure and Spec reporters

**Android Config (`wdio.android.conf.ts`):**

- UiAutomator2 driver
- Device: Pixel 8, Android 14.0
- Full reset enabled

**iOS Config (`wdio.ios.conf.ts`):**

- XCUITest driver
- Device: iPhone 17, iOS 26.5

---

## How to Run the Tests

### Available Scripts (from package.json)

```json
{
  "scripts": {
    "wdio:android": "wdio run ./config/wdio.android.conf.ts",
    "wdio:ios": "wdio run ./config/wdio.ios.conf.ts --mochaOpts.grep=\"@ios\""
  }
}
```

### Steps to Execute

1. **Install Dependencies:**

   ```bash
   pnpm install
   ```

2. **Run Android Tests:**

   ```bash
   pnpm run wdio:android
   ```

3. **Run iOS Tests (only @ios tagged):**
   ```bash
   pnpm run wdio:ios
   ```

---

## Current limitations & opportunities for improvement

As listed in `improvements-for-robust-automation.md`, the project is missing:

1. Wrapper methods in BasePage
2. Logging system
3. Screenshots/videos on failure
4. ESLint
5. Zod env var validation
6. CI/CD pipeline
