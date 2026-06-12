import * as path from 'path'
import { config as SharedConfig } from './wdio.shared.conf'

export const config = {
  ...SharedConfig,
  capabilities: [
    {
      platformName: 'iOS',
      'appium:deviceName': 'iPhone 17',
      'appium:platformVersion': '26.5',
      'appium:automationName': 'XCUITest',
      'appium:app': path.resolve(process.env.IOS_APP_PATH || ''),
      'appium:bundleId': process.env.IOS_APP_BUNDLE_ID,
    },
  ],
}
