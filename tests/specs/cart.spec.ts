import { step } from '@wdio/allure-reporter'
import { productScreen } from '@/screenObjects/product.screen'
import { productDetailsScreen } from '@/screenObjects/product-details.screen'
import { cartScreen } from '@/screenObjects/cart.screen'
import { loginScreen } from '@/screenObjects/login.screen'
import { teardown } from '@/support/helpers'

const platformName = driver.capabilities.platformName

describe('Cart Feature Tests - @cart', function () {
  beforeEach(async function () {
    const productName = 'Sauce Labs Backpack (red)'
    await step(`Add a product to the cart: ${productName}`, async () => {
      await productScreen.assertProductsScreenIsVisible()
      await productScreen.openProductDetailPage(productName)
      await productDetailsScreen.assertProductDetailPageTitleIsVisible(productName)
      await productDetailsScreen.clickAddToCartButton()
      await productDetailsScreen.assertCartQuantityIsCorrect(1)
    })
  })

  it(`Verify user can start checkout, then login is required:  @TC03 - ${platformName}`, async function () {
    await step('Open My Cart screen', async () => {
      await productDetailsScreen.openCart()
      await cartScreen.assertCartScreenIsVisible()
    })

    await step('Click the checkout button', async () => {
      await cartScreen.clickCheckoutButton()
    })

    await step('Verify the login screen is visible, login is required', async () => {
      await loginScreen.assertLoginScreenIsVisible()
      await loginScreen.assertLoginButtonIsVisible()
    })
  })

  it(`Verify user can remove a product from the cart: @TC04 - ${platformName}`, async function () {
    await step('Open My Cart screen', async () => {
      await productDetailsScreen.openCart()
      await cartScreen.assertCartScreenIsVisible()
    })

    await step('Click the remove button', async () => {
      await cartScreen.clickRemoveItemButton()
    })

    await step('Verify user is redirected to the no items screen', async () => {
      await cartScreen.assertNoItemsScreenIsVisible()
    })
  })

  afterEach(async function () {
    await teardown()
  })
})
