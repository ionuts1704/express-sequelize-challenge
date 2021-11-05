module.exports = {
  rootDir: "./",
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['<rootDir>/**/*(*.)@(test).[tj]s?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/', // default
  ],
  coverageThreshold: {
    global: {
      statements: 37.05,
      branches: 11.32,
      lines: 37.05,
      functions: 11.76
    }
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['js', 'json', 'node'],
  collectCoverageFrom: [
    "<rootDir>/src/**/**/*.js",
    "!<rootDir>/src/**/**/index.js"
  ],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ]
};
