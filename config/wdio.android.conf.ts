import * as path from 'path'
import { config as SharedConfig } from './wdio.shared.conf'

export const config: Partial<WebdriverIO.Config> = {
  ...SharedConfig,
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'Pixel_8',
      'appium:platformVersion': '14.0',
      'appium:automationName': 'UiAutomator2',
      'appium:app': path.resolve(process.env.ANDROID_APP_PATH || ''),
      'appium:appPackage': process.env.ANDROID_APP_PACKAGE,
      'appium:appWaitActivity': '*',
    },
  ],
}
