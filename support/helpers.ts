/**
 * Restart the app after each test case.
 */
export const teardown = async () => {
  try {
    const appId = driver.isAndroid ? driver.capabilities['appium:appPackage'] : driver.capabilities['appium:bundleId']
    if (appId) {
      await driver.terminateApp(appId)
      await driver.activateApp(appId)
    } else {
      await driver.reloadSession()
    }
  } catch (error) {
    throw new Error(`It was not possible to restart the app: ${error}`)
  }
}
