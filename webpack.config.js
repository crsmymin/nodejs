// webpack.config.js
const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MODE = process.env.WEBPACK_ENV;

module.exports = {
  mode: MODE,
  devtool: "source-map", //크롬에서 디버깅 가능하도록 원본코드같이 bundle
  entry: {
    index: ["@babel/polyfill","./public/index.js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:3000/dist/",
  },
  module: {
    rules: [
      {
        test: /\.js$/, //.js 파일 templating
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(sa|sc|c|pc)ss$/, //scss,sass,css,pcss templating
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", 
          "sass-loader", 
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          enforce: true,
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new MiniCssExtractPlugin({ 
      // filename: 'style.css',
      chunkFilename: 'style.css',
    }),
  ],
};