var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PROD = process.env.PROD_DEV ? true : false;

module.exports = {
  entry: path.join(__dirname, 'playground', 'index.js'),

  output: {
    filename: 'bundle.js'
  },

  devtool: PROD ? false : 'source-map',

  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin()
  ]
};
