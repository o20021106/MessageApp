const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: './src/components/nearby/nearby.js',
  output: {
    path: path.join(__dirname, '../src'),
    filename: 'components/nearby/nearbyBabel.js',
  },
  resolve: {
    extensions: ['.js', '.css']
  },

  module: {
    rules: [
      {
         test: /\.js$/,
         exclude: /node_modules/,
         use: 'babel-loader'
      },
       {
         test: /\.css$/,
         use: ExtractTextPlugin.extract({
           use: [
             {
               loader: 'css-loader',
               query: {
                 localIdentName: '[hash:8]',
                 modules: true
               }
             }
           ]
         })
       }
     ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '../dist/testing.css',
      allChunks: true
    })
  ]
};
