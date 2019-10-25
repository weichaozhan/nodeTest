module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'eslint-config-alloy/typescript'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true
        },
        "project": "./tsconfig.json"
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'rules': {
    }
};