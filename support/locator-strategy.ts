export const getElementById = (id: string) => {
  return driver.isAndroid
    ? $(`android=new UiSelector().resourceId("com.saucelabs.mydemoapp.android:id/${id}")`)
    : $(`#${id}`)
}

export const getElementByXPath = (xpath: string) => {
  return driver.isAndroid ? $(xpath) : $(`//${xpath}`)
}

export const getElementsByXPath = (xpath: string) => {
  return $$(xpath)
}
