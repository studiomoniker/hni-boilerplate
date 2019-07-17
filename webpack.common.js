/* eslint-env node */
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const packageInfo = require('./package.json');
const { execFileSync } = require('child_process');

const headerParam = {
  project: packageInfo.name,
  description: packageInfo.description,
  commit: execFileSync('git', [
    'log',
    '-1',
    '--date=iso',
    '--pretty=format:%cd\n             %H\n             %cn: %s',
  ]),
  contact:
    'info@studiomoniker.com – twitter.com/studiomoniker – github.com/studiomoniker',
  love: 'Moniker',
};

function generateHeader() {
  const toUppercase = str => str.charAt(0).toUpperCase() + str.slice(1);
  let header = '';
  for (var name in headerParam) {
    if (headerParam[name]) {
      header += `    ${toUppercase(name)} – ${headerParam[name]}\n\n`;
    }
  }
  return `  <!--\n\n${header}   -->`;
}

module.exports = {
  mode: 'development',
  entry: './src/scripts/index.js',
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg|mp3|wav|mp4|mov|avi|json|xml|bmp|woff|woff2|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: (url, resourcePath) => {
                // put assets on the same place as before
                return `assets${resourcePath.split('assets')[1]}`;
              },
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inlineSource: '.(js|css)$', // embed all javascript and css inline in production
      header: generateHeader(),
      title: packageInfo.description + ' by Moniker',
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.(woff|woff2|ttf|otf)$/.test(entry)) return 'font';
      },
      fileWhitelist: [/\.(woff|woff2|ttf|otf)$/],
      include: 'allAssets',
    }),
    new CopyPlugin([
      { from: './src/assets', to: 'assets' },
      { from: './proxy-images' },
    ]),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      chunkFilename: '[id].css',
    }),
  ],
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
