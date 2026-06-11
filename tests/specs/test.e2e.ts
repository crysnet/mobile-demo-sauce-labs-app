import ProductPage from '@/pageObjects/product.page'

describe('My Login application', () => {
  it(`launch app and should assert products screen is visible - ${driver.capabilities.platformName}`, async () => {
    await ProductPage.assertProductsScreenIsVisible()
  })
})
