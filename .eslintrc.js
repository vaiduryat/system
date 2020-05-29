module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'indent': ['off', 2],
    "strict": 0,//不使用严格模式
    "space-before-function-paren": 0,
    "comma-dangle": ["off"],
    "quotes": 0,
    "quote-props": 0,
    "object-property-newline": 0,
    "no-multiple-empty-lines": 0,
    "vue/no-unused-vars": 0
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

