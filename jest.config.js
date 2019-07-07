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
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
