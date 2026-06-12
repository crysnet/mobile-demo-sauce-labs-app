import { getElementById } from '@/support/locator-strategy'

class ProductDetailsPage {
  /*  =========== Locators for Product Details feature =========== */
  get productDetailPageTitle() {
    return getElementById('productTV')
  }

  /*  =========== Methods for Product Details feature =========== */
  async assertProductDetailPageTitleIsVisible(title: string) {
    await expect(this.productDetailPageTitle).toBeDisplayed({
      wait: 5000,
    })
    await expect(this.productDetailPageTitle).toHaveText(title)
  }
}

export default new ProductDetailsPage()
