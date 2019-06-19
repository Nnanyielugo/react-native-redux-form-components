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
    "no-underscore-dangle": "warn",
    "no-unused-vars": "warn",
    "radix": "warn",
    "no-prototype-builtins": "warn",
    "max-len": "warn",
    "camelcase": "warn",
    "class-methods-use-this": "warn",
    "no-use-before-define": "warn",
    "no-unused-expressions": "warn",
    "consistent-return": "warn",
    "array-callback-return": "warn",
    "no-shadow": "warn",
    "import/no-extraneous-dependencies": "off",
    "jsx-a11y/no-static-element-interactions": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "react/destructuring-assignment": "warn",
    "react/jsx-filename-extension": "off",
    "react/jsx-no-bind": "warn",
    "react/jsx-no-target-blank": "warn",
    "react/button-has-type": "warn",
    "react/forbid-prop-types": "warn",
    "react/require-default-props": "warn",
    "react/prefer-stateless-function": "warn",
    "import/no-unresolved": "warn"
  },
};
