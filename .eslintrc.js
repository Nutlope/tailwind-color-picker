/*
Required modules for this config:
yarn add -D\
  eslint\
  @typescript-eslint/parser\
  @typescript-eslint/eslint-plugin\
  eslint-plugin-react\
  eslint-plugin-import
*/
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      files: ['*.js*', '*.ts*'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_' },
        ],
      },
    },
  ],
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    semi: ['warn', 'always'],
    'no-console': ['warn'],
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
