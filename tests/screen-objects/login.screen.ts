import { getElementById } from '@/support/locator-strategy'

class LoginScreen {
  /*  =========== Locators for Login feature =========== */
  get loginScreenTitle() {
    return getElementById('loginTV')
  }

  get loginButton() {
    return getElementById('loginBtn')
  }

  /*  =========== Methods for Login feature =========== */
  async assertLoginScreenIsVisible() {
    await expect(this.loginScreenTitle).toBeDisplayed()
  }

  async assertLoginButtonIsVisible() {
    await expect(this.loginButton).toBeDisplayed()
  }
}

export const loginScreen = new LoginScreen()
