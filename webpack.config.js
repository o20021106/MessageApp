const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/components/nearby/nearby.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'nearbyBundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/

    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }],
  },
};
