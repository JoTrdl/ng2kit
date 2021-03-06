
var webpack = require('webpack'),
    fs = require('fs'),
    WebpackOnBuildPlugin = require('on-build-webpack'),
    AppCachePlugin = require('appcache-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

var BUILD_DIR = './build/',
    BUILD_FILES = [];

/**
 * Module export for Webpack
 */
module.exports = {
  entry: {
    'vendor': './src/vendor.ts',
    'bootstrap': './src/bootstrap.ts'
  },

  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new WebpackOnBuildPlugin(function() {
      BUILD_FILES = fs.readdirSync(BUILD_DIR).filter(function (file) {
          return fs.statSync(BUILD_DIR + file).isFile();
      });
    }),
    new AppCachePlugin({
      cache: BUILD_FILES,
      network: ['*'], // every else need network
      output: 'manifest.appcache'
    }),
    new HtmlWebpackPlugin({
      env: 'production',
      template: 'src/index.html',
      inject: false
    }),
    new CopyWebpackPlugin([
      { from: './src/app', to: 'app' }
      ],
      {ignore: ['*.ts']
    })
  ],

  resolve: {
    extensions: ['', '.ts', '.js', '.css']
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(ttf|eot|svg|woff(2)?).*$/, loader: "file-loader" },
      { test: /\.(png|jpg|jp(e)?g)$/, loader: "url-loader?limit=1000" }
  ],
    noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
  }
};
