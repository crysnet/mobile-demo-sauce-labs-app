import { $ } from "@wdio/globals";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductPage {
  /**
   * define selectors using getter methods
   */
  public get productsTitle() {
    return $("//android.widget.TextView[@content-desc='title']");
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  public async assertProductsScreenIsVisible() {
    await expect(this.productsTitle).toBeDisplayed({
      wait: 5000,
    });
  }
}

export default new ProductPage();
