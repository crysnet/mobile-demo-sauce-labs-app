import { getElementById } from '@/support/locator-strategy'

class ProductDetailsScreen {
  /*  =========== Locators for Product Details feature =========== */
  get productDetailPageTitle() {
    return getElementById('productTV')
  }

  get addToCartButton() {
    return getElementById('cartBt')
  }

  get cartQuantity() {
    return getElementById('cartTV')
  }

  get cartButton() {
    return getElementById('cartRL')
  }

  /*  =========== Methods for Product Details feature =========== */
  async assertProductDetailPageTitleIsVisible(title: string) {
    await expect(this.productDetailPageTitle).toBeDisplayed({
      wait: 5000,
    })
    await expect(this.productDetailPageTitle).toHaveText(title)
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click()
  }

  async assertCartQuantityIsCorrect(quantity: number) {
    await expect(this.cartQuantity).toBeDisplayed()
    await expect(this.cartQuantity).toHaveText(quantity.toString())
  }

  async openCart() {
    await this.cartButton.click()
  }
}

export const productDetailsScreen = new ProductDetailsScreen()
