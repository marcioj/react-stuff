var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var StringReplacePlugin = require("string-replace-webpack-plugin")

module.exports = {
  entry: './main.js',
  target: 'node',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /['"]use strict['"];/g,
              replacement: function () {
                return '';
              }
            }
          ]})
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': JSON.stringify(true)
    }),
    new StringReplacePlugin()
  ]
  // externals: function (context, request, callback) {
  //   // console.log(context)
  //   // console.log(request)
  //   if (context.indexOf('node_modules') !== -1) {
  //     return callback(null, 'commonjs ' + request)
  //   }
  //   callback()
  // }
  // externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).reduce(function (ext, mod) {
  //   console.log(mod)
  //   ext[mod] = 'commonjs ' + mod
  //   return ext
  // })
}
