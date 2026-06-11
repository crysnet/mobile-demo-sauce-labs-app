import LoginPage from "../pageobjects/product.page.js";

describe("My Login application", () => {
  it("launch app and should assert products screen is visible", async () => {
    await LoginPage.assertProductsScreenIsVisible();

    // await expect(SecurePage.flashAlert).toBeExisting();
    // await expect(SecurePage.flashAlert).toHaveText(
    //   expect.stringContaining("You logged into a secure area!"),
    // );
  });
});
