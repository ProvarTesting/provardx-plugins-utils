export const propertyFileContent = {
  provarHome: '${PROVAR_HOME}',
  projectPath: '${PROVAR_PROJECT_PATH}',
  resultsPath: '${PROVAR_RESULTS_PATH}',
  smtpPath: '',
  resultsPathDisposition: 'Increment',
  testOutputLevel: 'BASIC',
  pluginOutputlevel: 'WARNING',
  stopOnError: false,
  lightningMode: true,
  connectionRefreshType: 'Reload',
  metadata: {
    metadataLevel: 'Reuse',
    cachePath: '../.provarCaches',
  },
  environment: {
    testEnvironment: '${PROVAR_TEST_ENVIRONMENT}',
    webBrowser: 'Chrome',
    webBrowserConfig: 'Full Screen',
    webBrowserProviderName: 'Desktop',
    webBrowserDeviceName: 'Full Screen',
  },
  testprojectSecrets: '${PROVAR_TEST_PROJECT_SECRETS}',
};
