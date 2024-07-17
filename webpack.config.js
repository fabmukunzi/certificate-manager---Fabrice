const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CONFIG = require('./webpack.constants');

module.exports = {
  mode: CONFIG.ENVIRONMENT,
  entry: CONFIG.ENTRY_POINT,
  output: {
    path: __dirname + CONFIG.OUTPUT_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@': path.resolve(__dirname, 'src/'),
          },
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  devtool: CONFIG.PRODUCTION ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + CONFIG.HTML_TEMPLATE,
    }),
    new MiniCssExtractPlugin(),
  ],
};
