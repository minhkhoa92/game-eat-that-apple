const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    clean: true,
    filename: 'main.js'
  }
});
