const path = require('path');
const webpack = require('webpack');
const moduleConfig = require('./module.config.js');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/js/index.jsx'
  ],
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  output: {
    path: path.join(__dirname, '../src/html'),
    filename: 'App.wpbundle.js'
  },
  module: moduleConfig,
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
