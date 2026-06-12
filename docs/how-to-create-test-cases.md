# How to Create New Test Cases

## Project Structure Overview

```
mobile-demo-sauce-labs-app/
├── apps/                          # Mobile app binaries
├── config/                        # WebdriverIO configuration
│   ├── wdio.android.conf.ts      # Android-specific config
│   ├── wdio.ios.conf.ts          # iOS-specific config
│   └── wdio.shared.conf.ts       # Shared configuration
├── docs/                          # Documentation
├── support/                       # Helpers and utilities
│   ├── helpers.ts
│   └── locator-strategy.ts
└── tests/
    ├── screen-objects/            # Page Object Model files
    │   ├── base-page.ts
    │   ├── cart.screen.ts
    │   ├── login.screen.ts
    │   ├── product-details.screen.ts
    │   └── product.screen.ts
    └── specs/                     # Test specifications
        ├── cart.spec.ts
        └── products.spec.ts
```

## Step-by-Step Process to Create a New Test Case

### 1. Define the Test Scenario in Gherkin

Add your test scenario to `docs/test-cases.feature.md` following the Gherkin format.

### 2. Create or Update Screen Objects

#### 2.1. Identify the Screen

Determine which screen your test will interact with.

#### 2.2. Add Locators

Add new locators to the corresponding screen object file in `tests/screen-objects/`:

```typescript
class SomeScreen {
  /* =========== Locators =========== */
  get someElement() {
    return driver.isAndroid
      ? getElementByXPath("//android.widget.Button[@content-desc='some-id']")
      : getElementByXPath("//XCUIElementTypeButton[@name='some-id']")
  }
}
```

#### 2.3. Add Methods

Add methods to interact with the elements:

```typescript
async clickSomeElement() {
  await this.someElement.click()
}

async assertSomeElementIsVisible() {
  await expect(this.someElement).toBeDisplayed({ wait: 5000 })
}
```

### 3. Create or Update the Test Specification

Add your test case to the appropriate `.spec.ts` file in `tests/specs/`:

```typescript
import { step } from '@wdio/allure-reporter'
import { someScreen } from '@/screen-objects/some.screen'

const platformName = driver.capabilities.platformName

describe('Feature Name - @feature-tag', function () {
  it(`Test description: @TC05 - ${platformName}`, async function () {
    await step('Step description', async () => {
      await someScreen.doSomething()
    })

    await step('Assert something', async () => {
      await someScreen.assertSomething()
    })
  })
})
```

### 4. Follow Naming Conventions

- **Tags**: Use descriptive tags like `@feature-name`, `@TC05`, `@android`, `@ios`
- **Test Case IDs**: Follow the sequence (TC01, TC02, TC03, etc.)
- **Screen Objects**: Name files as `[feature].screen.ts`
- **Spec Files**: Name files as `[feature].spec.ts`

### 5. Run the Tests

**For Android:**

```bash
pnpm run wdio:android
```

**Run specific tags:**

```bash
pnpm run wdio:android --mochaOpts.grep="@TC05"
```

**For iOS:**

```bash
pnpm run wdio:ios
```

**Run specific tags:**

```bash
pnpm run wdio:ios -- --mochaOpts.grep="@TC05"
```

## Best Practices

1. **Use Page Object Model**: Keep all locators and interactions in screen object files
2. **Use Allure Steps**: Wrap actions in `step()` for better reporting
3. **Handle Both Platforms**: Always add locators for Android and iOS
4. **Use Assertions**: Always use assertions where necessary
5. **Add Proper Tags**: Tag tests appropriately for filtering
6. **Keep Tests Atomic**: Each test should focus on one specific functionality
