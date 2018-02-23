const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: './src/components/nearby/nearbyOuter.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'nearbyBundle.js',
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
      filename: 'testing.css',
      allChunks: true
    })
  ]
};