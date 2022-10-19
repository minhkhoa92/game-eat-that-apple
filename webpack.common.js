const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Eat the apple!',
      header: 'Eat the apple title',
      metaDesc: 'Game Clone of Snake',
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      favicon: './src/globe.png'
    })
  ],
  module: {
    rules: [
      {
        test:/\.html$/,
        use: ['html-loader']
      },
      {
        test:/\.(jpg)$/,
        use: {
          loader: ['file-loader'], 
          options: {
            name: "[name].[ext]"
          }
        }
      }
    ]
  }
};
