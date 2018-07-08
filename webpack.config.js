const webpack = require('webpack');

const srcDir = './assets/src/js';

const config = {
  entry: `${srcDir}/app.js`,
  output: {
    path: `${__dirname}/assets/dist/js`,
    filename: 'bundle.js',
  },
  watch: true,
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};

module.exports = () => ({ config });