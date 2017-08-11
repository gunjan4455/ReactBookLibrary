'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize:true
    })
  ],
  resolve: {
    alias: {
      'styles': path.join(__dirname, '/styles/')
    },
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      },
      include: __dirname
    }, {
      test: /\.json?$/,
      loader: 'json',
      include: __dirname
    }, {
      test: /\.css$/,
      loaders: [ 'style-loader', 'css-loader' ],
      include: __dirname
    },
    {
      test: /\.(png|jpg|svg|woff|woff2)?(\?v=\d+.\d+.\d+)?$/,
      loader: 'url-loader?limit=8192'
    },
    {
      test: /\.(eot|ttf)$/,
      loader: 'file-loader'
    }
    ]
  }
};
