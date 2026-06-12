import { getElementByXPath, getElementsByXPath } from '@/support/locator-strategy'

class ProductScreen {
  /*  =========== Locators for Product feature =========== */
  get productsTitle() {
    return driver.isAndroid
      ? getElementByXPath("//android.widget.TextView[@content-desc='title']")
      : getElementByXPath("//XCUIElementTypeStaticText[@name='title']")
  }

  get productsList() {
    return driver.isAndroid
      ? getElementsByXPath(
          '//androidx.recyclerview.widget.RecyclerView[@content-desc="Displays all products of catalog"]/android.view.ViewGroup'
        )
      : getElementsByXPath('')
  }

  /*  =========== Methods for Product feature =========== */
  async assertProductsScreenIsVisible() {
    await expect(this.productsTitle).toBeDisplayed({
      wait: 5000,
    })
  }

  /**
   * Get product locator from the list view filtered by name
   * @param name Product name
   * @returns Product locator
   */
  async getProductLocatorFromListView(name: string) {
    const items = await this.productsList
    const itemTitleLocator = driver.isAndroid ? '//android.widget.TextView[@content-desc="Product Title"]' : ''

    // Get the item from the list filtered by name
    for (const item of items) {
      const productTitleElement = item.$(itemTitleLocator)
      const text = await productTitleElement.getText()
      if (text.includes(name)) {
        return item
      }
    }
    throw new Error(`Product "${name}" not found in the list`)
  }

  async openProductDetailPage(name: string) {
    const productLocator = await this.getProductLocatorFromListView(name)
    await productLocator.click()
  }
}

export const productScreen = new ProductScreen()
