module.exports = {
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-prototype-builtins': 'off',
    'no-plusplus': 'off',
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
    // Just because of hoising
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    'react/prop-types': 'off',
    'class-methods-use-this': 'off',
    // We need this to write generic code in components mounting
    'react/jsx-props-no-spreading': 'off',
    // Non-null assertion operator makes strict typechecking useless
    '@typescript-eslint/no-non-null-assertion': 'error',
    // TypeScript handles it better
    'consistent-return': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
}
