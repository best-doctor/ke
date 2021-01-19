const esModules = ['react-icons', 'lodash-es'].join('|');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: ['./src/**/*.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  transform: {
    'js': 'jest-esm-transformer'
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json'
    }
  },
}
