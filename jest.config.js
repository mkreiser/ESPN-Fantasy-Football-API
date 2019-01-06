module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.stubs.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  restoreMocks: true,
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
