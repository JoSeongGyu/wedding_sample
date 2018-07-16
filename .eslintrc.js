// .eslintrc.js
module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
  },
  plugins: [
    'import',
  ],
  globals: {
    'jQuery': true,
    '$': true,
    'path': true,
    'skel': true,
    'scrolly': true,
    'scrollex': true,
  },
  rules: {
    'max-len': ['warn', { 'code': 120, 'ignoreTemplateLiterals': true }],
    'no-param-reassign': ['error', { 'props': false }],
    'no-alert': 'off',

    // books에 ESlint 적용을 위해 임시로 off하는 기능들
    // 각 케이스별로 refactoring 필요
    'camelcase': 'off', // -> ['error', { 'properties': 'never' }
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'func-names': 'off',
    'valid-jsdoc': 'off',
    'class-methods-use-this': 'off',
    'no-nested-ternary': 'off',
    'new-cap': ['error', {
      'newIsCapExceptionPattern': '$.*'
    }],

    // babel-eslint
    'strict': 0,
  },
  settings: {
    // To resolve absolute paths and aliases in import
    'import/resolver': {
      webpack: { config: 'webpack.config.js' },
    },
  },
};