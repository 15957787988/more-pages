module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-BMAP_STATUS_SUCCESS':'off',
    'keyword-spacing': 2,
    'curly': [2, 'multi-line', 'consistent'],
    "indent": ["error", 2],
    'arrow-spacing': 2,
    'block-spacing': 2,
    'computed-property-spacing': 2,
    'func-call-spacing': 2,
    'keyword-spacing': 2,
    'space-before-blocks': 2,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}