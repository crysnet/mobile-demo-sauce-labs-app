import { getElementById, getElementByText } from '@/support/locator-strategy'

class CartScreen {
  /*  =========== Locators for Cart feature =========== */
  get cartScreenTitle() {
    return getElementByText('My Cart')
  }

  get cartQuantity() {
    return getElementById('cartTV')
  }

  get checkoutButton() {
    return getElementByText('Proceed To Checkout')
  }

  /*  =========== Methods for Cart feature =========== */
  async assertCartScreenIsVisible() {
    await expect(this.cartScreenTitle).toBeDisplayed({
      wait: 5000,
    })
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click()
  }
}
export const cartScreen = new CartScreen()
