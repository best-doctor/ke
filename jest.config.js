const esModules = ['react-icons', 'lodash-es'].join('|')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts', '<rootDir>/jest-setup.ts'],
  collectCoverageFrom: ['./src/**/*.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@cdk(.*)$': '<rootDir>/src/django-spa/cdk$1',
    '^~types(.*)$': '<rootDir>/src/django-spa/types$1',
    '^@plugins(.*)$': '<rootDir>/src/django-spa/plugins$1',
    '^@utils(.*)$': '<rootDir>/src/django-spa/utils$1',
    '^@components(.*)$': '<rootDir>/src/django-spa/components$1',
    '^@aspects(.*)$': '<rootDir>/src/django-spa/aspects$1',
    '^@layouts(.*)$': '<rootDir>/src/django-spa/layouts$1',
    '^@presenters(.*)$': '<rootDir>/src/django-spa/presenters$1',
    '^@smart-components(.*)$': '<rootDir>/src/django-spa/smart-components$1',
  },
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  transform: {
    js: 'jest-esm-transformer',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json',
    },
  },
}
