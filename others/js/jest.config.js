export default {
  testEnvironment: 'node', // Use node environment for testing
  verbose: true, // Display individual test results with the test suite hierarchy
  collectCoverage: true, // Collect coverage information
  coverageDirectory: 'coverage', // Directory where Jest should output coverage files
  testPathIgnorePatterns: ['/node_modules/'], // Ignore tests in node_modules
  "transform": {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest"
  }
}