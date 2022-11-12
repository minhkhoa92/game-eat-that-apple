const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Eat that apple!',
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
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: "[name].[ext]",
            outputPath: 'imgs'
          }
        }
      },
      {
        test: /\.(wav|mp3)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: "[name].[ext]",
            outputPath: 'snds'
          }
        }
      }
    ]
  }
};
