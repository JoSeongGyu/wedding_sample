const webpack = require('webpack');
const path = require('path');

const srcDir = './docs/assets/src/js';

module.exports = {
  mode: 'development',
  entry: {
    main: `${srcDir}/main.js`,
    comment_list: `${srcDir}/commentList.js`,
  },
  output: {
    filename: '[name].min.js',
    path: `${__dirname}/docs/assets/dist/js`,
  },
  module: {
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
};
