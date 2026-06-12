import productPage from '@/pageObjects/product.page'
import productDetailsPage from '@/pageObjects/product-details.page'

const platformName = driver.capabilities.platformName

describe('Products Feature Tests - @products', function () {
  it(`launch app and should assert products screen is visible: @TC01 - ${platformName}`, async function () {
    await productPage.assertProductsScreenIsVisible()
  })

  it(`Verify User Can Add a Product to the Cart: @TC02 - ${platformName}`, async function () {
    const productName = 'Sauce Labs Backpack'
    await productPage.openProductDetailPage(productName)
    await productDetailsPage.assertProductDetailPageTitleIsVisible(productName)
    await productDetailsPage.clickAddToCartButton()
    await productDetailsPage.assertCartQuantityIsCorrect(1)
  })
})
