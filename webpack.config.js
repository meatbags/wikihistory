var path = require('path');
var webpack = require('webpack');
var dir = './src/';

module.exports = {
  entry: {
    'app': dir + 'app.js',
    'app.min': dir + 'app.js'
  },
  output: {
    library: 'wikihistory',
    libraryTarget: 'var',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  stats: {
      colors: true
  }
};
