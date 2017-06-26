import path from 'path';
import webpack from 'webpack';
import moduleConfig from './module.config';

export default {
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
    path: path.join(__dirname, '../src/html/js'),
    filename: 'main.js'
  },
  module: moduleConfig,
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

