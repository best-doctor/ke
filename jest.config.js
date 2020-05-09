module.exports = {
  verbose: true,
  testPathIgnorePatterns: ['node_modules', 'dist'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '@admin/(.*)': '<rootDir>/src/admin/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  },
}