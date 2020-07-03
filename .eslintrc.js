module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended', 'alloy', 'alloy/typescript'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'BigInt': true,
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'ecmaFeatures': {
      'modules': true
    },
    'project': './tsconfig.json'
  },
  'plugins': ['@typescript-eslint'],
  'rules': {
    'semi': ['error', 'always'], 
    'semi-style': ['error', 'last'],
    'quotes': ['error', 'single'],
  }
};