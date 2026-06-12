import { getElementById, getElementByXPath } from '@/support/locator-strategy'

class ProductDetailsScreen {
  /*  =========== Locators for Product Details feature =========== */
  async getProductDetailPageTitle(title: string) {
    return driver.isAndroid
      ? getElementById('productTV')
      : getElementByXPath(`//XCUIElementTypeStaticText[@name="${title}"]`)
  }

  get addToCartButton() {
    return driver.isAndroid ? getElementById('cartBt') : getElementByXPath('//XCUIElementTypeButton[@name="AddToCart"]')
  }

  async getCartQuantity(quantity: number) {
    return driver.isAndroid
      ? getElementById('cartTV')
      : getElementByXPath(`//XCUIElementTypeStaticText[@name="${quantity}"]`)
  }

  get cartButton() {
    return driver.isAndroid
      ? getElementById('cartRL')
      : getElementByXPath('//XCUIElementTypeButton[@name="Cart-tab-item"]')
  }

  /*  =========== Methods for Product Details feature =========== */
  async assertProductDetailPageTitleIsVisible(title: string) {
    await expect(await this.getProductDetailPageTitle(title)).toBeDisplayed({
      wait: 5000,
    })
    await expect(await this.getProductDetailPageTitle(title)).toHaveText(title)
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click()
  }

  async assertCartQuantityIsCorrect(quantity: number) {
    const cartQuantity = await this.getCartQuantity(quantity)
    await expect(cartQuantity).toBeExisting()
    await expect(cartQuantity).toHaveText(quantity.toString())
  }

  async openCart() {
    await this.cartButton.click()
  }
}

export const productDetailsScreen = new ProductDetailsScreen()
