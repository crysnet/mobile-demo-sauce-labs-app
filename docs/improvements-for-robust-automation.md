# Improvements for a more robust automation project

## 1. Wrapper methods for reusability and maintainability

### Why?

- Centralize repeated actions (click, fill, etc.) and assertions
- Easier to maintain and update logic in one place
- Consistent behavior across all tests
- Better error handling

### Implementation Example

#### Update `base-page.ts` with Wrappers:

```typescript
import { step } from '@wdio/allure-reporter'

export default class BasePage {
  /**
   * Wrapper for click action with logging and retry
   */
  async click(element: WebdriverIO.Element) {
    try {
      await logger.info(`Clicking on ${element.locator}`)
      await element.waitForDisplayed({ timeout: 10000 })
      await element.waitForEnabled({ timeout: 10000 })
      await element.click()
    } catch (error) {
      await logger.error(`Clicking on ${elementName} failed: ${error}`)
      throw error
    }
  }

  /**
   * Wrapper for sendKeys action
   */
  async fill(element: WebdriverIO.Element, value: string) {
    try {
      await logger.info(`Filling ${element.locator} with: ${value}`)
      await element.waitForDisplayed({ timeout: 10000 })
      await element.clearValue()
      await element.setValue(value)
    } catch (error) {
      await logger.error(`Filling ${element.locator} failed: ${error}`)
      throw error
    }
  }

  /**
   * Wrapper for assertion
   */
  async assertElementToBeVisible(element: WebdriverIO.Element) {
    try {
      await logger.info(`Asserting ${element.locator} is visible`)
      await expect(element).toBeDisplayed({ wait: 10000 })
    } catch (error) {
      await logger.error(`Asserting ${element.locator} is visible failed: ${error}`)
      throw error
    }
  }

  /**
   * Wrapper for assertion with text
   */
  async assertElementToHaveText(element: WebdriverIO.Element, expectedText: string) {
    try {
      await logger.info(`Asserting ${element.locator} has text: ${expectedText}`)
      await expect(element).toHaveText(expectedText, { wait: 10000 })
    } catch (error) {
      await logger.error(`Asserting ${element.locator} has text: ${expectedText} failed: ${error}`)
      throw error
    }
  }
}
```

#### Update screen objects to extend BaseScreen:

```typescript
import { getElementByXPath } from '@/support/locator-strategy'
import BaseScreen from './base.screen'

class ProductScreen extends BaseScreen {
  get productsTitle() {
    return driver.isAndroid
      ? getElementByXPath("//android.widget.TextView[@content-desc='title']")
      : getElementByXPath("//XCUIElementTypeStaticText[@name='title']")
  }

  async assertProductsScreenIsVisible() {
    await this.assertElementToBeVisible(this.productsTitle)
    await this.assertElementToHaveText(this.productsTitle, 'Products Title')
  }
}

export const productScreen = new ProductScreen()
```

---

## 2. Logging with winstonJs

### Why?

- Detailed tracking of every action
- Better debugging capabilities
- Persistent log files for later analysis
- Integration with wrapper methods

## 3. Screenshots and videos on test failure

### Why?

- Visual evidence of failures
- Faster debugging
- Better reporting

### Implementation (Update `wdio.shared.conf.ts`)

```typescript
export const config: Partial<WebdriverIO.Config> = {
  // ... existing config ...

  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (error) {
      // Take screenshot on failure
      await driver.saveScreenshot(`./screenshots/${test.title.replace(/\s+/g, '_')}_${Date.now()}.png`)

      // For video recording, you'd need additional setup with Appium capabilities
    }
  },

  // Appium capabilities for video recording (example)
  // capabilities: [{
  //   'appium:recordScreenshotsOnError': true,
  //   'appium:androidInstallTimeout': 90000,
  // }]
}
```

---

## 4. ESLint for code quality

### Why?

- Consistent code style across the team
- Catch potential errors early
- Enforce best practices

### Implementation steps

1. **Install dependencies:**

```bash
pnpm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

2. **Create `.eslintrc.cjs`:**

```javascript
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
  },
  env: {
    node: true,
    mocha: true,
  },
}
```

3. **Add script to `package.json`:**

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix"
  }
}
```

---

## 5. Zod for environment variables management

### Why?

- Centralize environment variables
- Validate required variables at startup
- Type safety
- Avoid missing env var errors

### Implementation steps

1. **Install Zod:**

```bash
pnpm install zod
```

2. **Create `support/env.ts`:**

```typescript
import { z } from 'zod'

// Define schema
const envSchema = z.object({
  PLATFORM: z.enum(['android', 'ios']),
  APP_PATH: z.string(),
  DEVICE_NAME: z.string(),
  APPIUM_URL: z.string().url().default('http://localhost:4723'),
  // Add other required env vars
})

// Parse and validate env vars
const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:')
  console.error(parsedEnv.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsedEnv.data
```

3. **Create `.env` file (and `.env.example`):**

```env
PLATFORM=android
APP_PATH=./apps/your-app.apk
DEVICE_NAME=emulator-5554
APPIUM_URL=http://localhost:4723
```

---

## 6. CI/CD with BrowserStack or Sauce Labs

### Why?

- Run tests automatically on every commit
- Test on multiple real devices
- Scale test execution
- Integrate with your development workflow

### Implementation example with GitHub Actions

Create `.github/workflows/automation.yml`:

```yaml
name: Mobile Automation Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint code
        run: npm run lint

      - name: Run Android Tests on BrowserStack
        env:
          BROWSERSTACK_USERNAME: ${{ secrets.BROWSERSTACK_USERNAME }}
          BROWSERSTACK_ACCESS_KEY: ${{ secrets.BROWSERSTACK_ACCESS_KEY }}
        run: npm run wdio:android

      - name: Upload Allure Results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: allure-results
          path: allure-results/

      - name: Upload Screenshots
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: failure-screenshots
          path: screenshots/
```

### BrowserStack Capabilities Example (`wdio.browserstack.conf.ts`)

```typescript
export const config: Partial<WebdriverIO.Config> = {
  services: [
    [
      'browserstack',
      {
        browserstackLocal: false,
      },
    ],
  ],
  capabilities: [
    {
      'bstack:options': {
        deviceName: 'Google Pixel 8',
        osVersion: '14.0',
        appiumVersion: '2.0.0',
        projectName: 'Mobile Demo App',
        buildName: 'Build 1.0',
        sessionName: 'Android Test Session',
        app: 'bs://<your-app-hash>',
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      },
      platformName: 'android',
    },
  ],
}
```

---

## Summary of improvements

| Improvement           | Benefits                                          |
| --------------------- | ------------------------------------------------- |
| Wrapper Methods       | Reusability, maintainability, consistent behavior |
| WinstonJS Logging     | Better debugging, persistent logs                 |
| Screenshots/Videos    | Visual evidence, faster debugging                 |
| ESLint                | Code consistency, catch errors early              |
| Zod Env Vars          | Type safety, validate required vars               |
| CI/CD + Cloud Devices | Automated testing, scale, real devices            |
