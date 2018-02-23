/*const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/components/nearby/nearbyOuter.js',
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
*/


const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: './src/components/nearby/nearbyOuter.js',
  output: {
    path: path.join(__dirname, 'dist'),
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


/*
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: './src/components/nearby/nearby.js',
  output: {
    path: __dirname,
    filename: 'src/components/nearby/nearbyBabel.js',
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
      filename: 'dist/testing.css',
      allChunks: true
    })
  ]
};

*/
