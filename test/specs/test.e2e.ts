import LoginPage from "../pageobjects/product.page.js";

describe("My Login application", () => {
  it(`launch app and should assert products screen is visible - ${driver.capabilities.platformName}`, async () => {
    await LoginPage.assertProductsScreenIsVisible();
  });
});
