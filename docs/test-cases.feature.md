# Automated Test Cases - Gherkin Format

### Tags and platform compatibility summary

| Case | Tags                   | Platforms    |
| ---- | ---------------------- | ------------ |
| TC01 | @products, @TC01       | Android      |
| TC02 | @products, @TC02, @ios | Android, iOS |
| TC03 | @cart, @TC03           | Android      |
| TC04 | @cart, @TC04           | Android      |

---

### Products feature

```gherkin
@products
Feature: Products Feature
  As a user of the Sauce Labs mobile app
  I want to browse products and add them to the cart
  So that I can proceed to checkout

  @TC01
  Scenario: Launch app and verify products screen is visible
    Given the app is launched
    Then the products screen should be visible

  @TC02 @ios
  Scenario: User can add a product to the cart
    Given the products screen is visible
    When I open the product detail page for "Sauce Labs Backpack (Black for iOS, regular for Android)"
    Then the product detail page title should be visible
    When I click the add to cart button
    Then the product should be added to the cart with quantity 1
```

---

### Cart feature

```gherkin
@cart
Feature: Cart Feature
  As a user of the Sauce Labs mobile app
  I want to manage my cart and proceed to checkout
  So that I can purchase products

  Background:
    Given a product "Sauce Labs Backpack (red)" is added to the cart
    And the cart quantity is 1

  @TC03
  Scenario: User starts checkout and login is required
    When I open the My Cart screen
    And I click the checkout button
    Then the login screen should be visible
    And the login button should be visible

  @TC04
  Scenario: User can remove a product from the cart
    When I open the My Cart screen
    And I click the remove item button
    Then the no items screen should be visible
```
