module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "functions": "ignore"
    }],
    "react/forbid-prop-types": 0,
    "class-methods-use-this": 0
  },
  parser: 'babel-eslint',
  env: {
    jest: true,
  }
};
