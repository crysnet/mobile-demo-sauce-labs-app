export const config: Partial<WebdriverIO.Config> = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  runner: 'local',
  tsConfigPath: '../tsconfig.json',
  port: 4723,
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // of the configuration file being run.
  //
  // The specs are defined as an array of spec files (optionally using wildcards
  // that will be expanded). The test for each spec file will be run in a separate
  // worker process. In order to have a group of spec files run in the same worker
  // process simply enclose them in an array within the specs array.
  //
  // The path of the spec files will be resolved relative from the directory of
  // of the config file unless it's absolute.
  //
  specs: ['../tests/specs/**/*.ts'],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: 10,
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'info',
  bail: 0,
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  /* Test runner services */
  // services: ["appium"], // Instead, I use the Appium service from my terminal, globally installed
  framework: 'mocha',
  specFileRetries: 0,
  specFileRetriesDelay: 5,
  // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
        addConsoleLogs: false,
        reportedEnvironmentVars: {
          NODE_VERSION: process.version,
          ENV: 'local',
        },
      },
    ],
  ],
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000, // 60 seconds
  },
}
