export const propertyFileContent = {
  provarHome: '${PROVAR_HOME}',
  projectPath: '${PROVAR_PROJECT_PATH}',
  resultsPath: '${PROVAR_RESULTS_PATH}',
  smtpPath: '',
  resultsPathDisposition: 'Increment',
  stopOnError: false,
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
  testplanFeatures: [
    { name: 'PDF', type: 'OUTPUT', enabled: 'true' },
    { name: 'PIECHART', type: 'OUTPUT', enabled: 'true' },
    { name: 'EMAIL', type: 'NOTIFICATION', enabled: 'true' },
    { name: 'TEST_MANAGER', type: 'REPORTING', enabled: 'true' },
  ],
};
