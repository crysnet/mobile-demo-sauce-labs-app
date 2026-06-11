class ProductPage {
  public get productsTitle() {
    return driver.isAndroid
      ? $("//android.widget.TextView[@content-desc='title']")
      : $("//XCUIElementTypeStaticText[@name='title']")
  }

  public async assertProductsScreenIsVisible() {
    await expect(this.productsTitle).toBeDisplayed({
      wait: 5000,
    })
  }
}

export default new ProductPage()
