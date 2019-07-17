/* eslint-env node */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
      }),
    ],
  },
  plugins: [
    new CompressionPlugin({
      test: /\.(html|css|js)(\?.*)?$/i, // only compressed html/css/js, skips compressing sourcemaps etc
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
});
