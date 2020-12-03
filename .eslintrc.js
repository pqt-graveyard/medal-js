module.exports = {
  extends: '@pqt',
  env: {
    node: true,
    "jest": true
  },
  overrides: [
    {
      files: ['pages/**/*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
      },
    },
    {
      files: ['next-env.d.ts'],
      rules: {
        'unicorn/prevent-abbreviations': 'off',
      },
    },
  ],
};