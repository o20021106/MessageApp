const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './editProfile.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'editProfileBundle.js',
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
