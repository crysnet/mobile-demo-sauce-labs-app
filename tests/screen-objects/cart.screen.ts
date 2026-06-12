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

  get removeItemButton() {
    return getElementById('removeBt')
  }

  get noItemsScreenTitle() {
    return getElementById('noItemTitleTV')
  }

  get goShoppingButton() {
    return getElementById('shoppingBt')
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

  async clickRemoveItemButton() {
    await this.removeItemButton.click()
  }

  async assertNoItemsScreenIsVisible() {
    await expect(this.noItemsScreenTitle).toBeDisplayed()
    await expect(this.goShoppingButton).toBeDisplayed()
  }
}
export const cartScreen = new CartScreen()
