const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './registerLogin.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'registerLoginBundle.js',
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
