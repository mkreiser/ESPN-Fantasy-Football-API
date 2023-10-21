module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!src/**/*.test.js',
    '!src/**/*.stubs.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  restoreMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/src/**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
