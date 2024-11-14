/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  plugins: ["@typescript-eslint"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 'latest'
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  rules: {
    semi: ['error', 'always'],
    indent: ['error', 2],
    curly: ['error', 'all'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' }
    ],
    'no-underscore-dangle': ['off'],
    'vue/no-v-html': ['off'],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForOfStatement',
        message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.'
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
      }
    ],
    /*
    'import/no-named-as-default': 0,
    'vue/no-multiple-template-root': 0,
    // Only allow debugger in development
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    'import/no-unresolved': ['off'],
    strict: ['error', 'never'],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'no-param-reassign': ['off'],
    'no-use-before-define': ['off'],
    'operator-linebreak': ['off'],
    'no-nested-ternary': ['off'],
    'prefer-promise-reject-errors': ['off'],
    'prefer-template': ['error'],
    'guard-for-in': 'off',
    'object-curly-newline': 'off',
    'vue/valid-v-slot': ['error', {
      allowModifiers: true
    }]
      */
  },
};
