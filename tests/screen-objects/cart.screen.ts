import { getElementById } from '@/support/locator-strategy'

class CartScreen {
  /*  =========== Locators for Cart feature =========== */
  get cartScreenTitle() {
    return getElementById('cartTV')
  }
  get cartQuantity() {
    return getElementById('cartTV')
  }
}
export const cartScreen = new CartScreen()
