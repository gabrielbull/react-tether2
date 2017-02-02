var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'index.js'),

  output: {
    path: path.join(__dirname, 'playground'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    filename: 'index.js',
    contentBase: './playground'
  },

  devtool: 'source-map',

  resolve: {
    modules: [
      path.join(__dirname, '..'),
      path.join(__dirname, '..', 'node_modules'),
    ],
    alias: {
      'react-tether2': path.join(__dirname, '..', 'src', 'index')
    }
  },

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
