module.exports = {
  clearMocks: true,
  collectCoverage: false,
  restoreMocks: true,
  testEnvironment: 'node',
  testMatch: ['**/integration-tests/**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
