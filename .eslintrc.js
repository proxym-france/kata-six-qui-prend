module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    'accessor-pairs': ['off'],
    '@typescript-eslint/prefer-readonly': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/no-confusing-void-expression': ['off'],
    '@typescript-eslint/space-before-function-paren': ['off'],
    '@typescript-eslint/no-extraneous-class': ['off'],
    '@typescript-eslint/semi': ['off'],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi', // 'none' or 'semi' or 'comma'
        requireLast: true
      },
      singleline: {
        delimiter: 'semi', // 'semi' or 'comma'
        requireLast: false
      }
    }]
  }
}
