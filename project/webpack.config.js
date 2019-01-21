const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devserver            = require('./webpack/devserver');
const sass                 = require('./webpack/sass');
const extractCSS           = require('./webpack/css.extract');
const files               = require('./webpack/files');
const js                   = require('./webpack/js');
const prodPlugins          = require('./webpack/prod.plugins');
const devPlugins           = require('./webpack/dev.plugins');

var config = {
  module: {
    rules: [
      ...files(),
      ...js(),
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.entry= [ 
      './src/client.js',
      './src/components/sass/main.scss'
    ]
    config.output = {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    }
    config.devtool = 'source-map';
    config.devServer = devserver();
    config.plugins = devPlugins();
    config.module.rules = config.module.rules.concat([
      ...sass()
    ])
  }

  if (argv.mode === 'production') {
    config.entry = [
      './src/client.js',
      './src/components/sass/main.scss'
    ]
    config.output = {
      path: path.resolve(__dirname, 'build'),
      filename: 'js/bundle.[hash].js'
    }
    config.plugins = [
      new CleanWebpackPlugin('build', {}),
      ...prodPlugins(),
    ]
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        })
      ]
    }
    config.module.rules = config.module.rules.concat([
      ...extractCSS()
    ])
  }
  return config;
};
