import { step } from '@wdio/allure-reporter'
import { productScreen } from '@/screen-objects/product.screen'
import { productDetailsScreen } from '@/screen-objects/product-details.screen'

const platformName = driver.capabilities.platformName

describe('Products Feature Tests - @products', function () {
  it(`Launch app and should assert products screen is visible: @TC01 - ${platformName}`, async function () {
    await step(`Assert products screen is visible - ${platformName}`, async () => {
      await productScreen.assertProductsScreenIsVisible()
    })
  })

  it(`Verify User Can Add a Product to the Cart: @TC02 - ${platformName}`, async function () {
    const productName = 'Sauce Labs Backpack'
    await step(`Open product detail page for ${productName}`, async () => {
      await productScreen.openProductDetailPage(productName)
    })

    await step(`Assert product detail page title is visible for ${productName}`, async () => {
      await productDetailsScreen.assertProductDetailPageTitleIsVisible(productName)
    })

    await step(`Click add to cart button for ${productName}`, async () => {
      await productDetailsScreen.clickAddToCartButton()
    })

    const quantity = 1
    await step(`Assert product ${productName} added to cart and quantity is correct: ${quantity}`, async () => {
      await productDetailsScreen.assertCartQuantityIsCorrect(quantity)
    })
  })
})
