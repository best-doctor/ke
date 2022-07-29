const baseTypescript = {
  extends: ['plugin:import/typescript'],
  rules: {
    '@typescript-eslint/no-unsafe-argument': 'off',
  },
  parserOptions: {
    project: './tsconfig.spec.json',
  },
}

module.exports = {
  root: true,
  extends: ['@bestdoctor/eslint-config'],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['**/*.stories.tsx', '**/*.stories.ts'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      ...baseTypescript,
    },
    {
      files: ['src/cdk/**/*.ts*', 'src/features/**/*.ts*', 'src/django-spa/components/**/*.ts*'],
      ...baseTypescript,
      rules: {
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
      },
    },
    {
      files: ['src/features/**/*.ts*'],
      ...baseTypescript,
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
    {
      files: ['src/**/*.stories.ts*'],
      ...baseTypescript,
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/fixtures.ts*'],
      ...baseTypescript,
      rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      },
    },
  ],
}
