import productPage from '@/pageObjects/product.page'
import productDetailsPage from '@/pageObjects/product-details.page'

const platformName = driver.capabilities.platformName

describe('Products Feature Tests', function () {
  it(`launch app and should assert products screen is visible - ${platformName}`, async function () {
    await productPage.assertProductsScreenIsVisible()
  })

  it(`Verify User Can Add a Product to the Cart - ${platformName}`, async function () {
    const productName = 'Sauce Labs Backpack'
    await productPage.openProductDetailPage(productName)
    await productDetailsPage.assertProductDetailPageTitleIsVisible(productName)
  })
})
