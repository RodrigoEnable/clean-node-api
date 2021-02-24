export default {
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin'
  }
}
