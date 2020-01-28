/* eslint-env node */
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new CopyPlugin([{ from: './iframe-test', to: 'iframe-test' }])],
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0'
  },
});
