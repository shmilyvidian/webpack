const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin'); // 之前用这个插件：extract-text-webpack-plugin 抽离css
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');
const UglifyWebpack = require('uglifyjs-webpack-plugin');
const Webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpack = require('copy-webpack-plugin')
module.exports = {
  //开发环境不走优化配置项
  optimization:{
    minimizer:[
      new UglifyWebpack({
        cache:true,
        parallel:true,
        sourceMap:true
      }),
      new OptimizeCssAssets()
    ]
  },
  watch:true,
  watchOptions:{
    poll:1000,
    aggregateTimeout:500, //防抖
    ignored:/node_modules/,
  },
  devServer: {
    host:'0.0.0.0',
    port: 3009,
    progress:true,
    contentBase: path.resolve(__dirname,'build'),
    compress: true,
    open:true
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname,'build'),
    filename: 'bundle.[hash].js'
  },
  module:{
    rules: [
      // { test:require.resolve('jquery'),use:'expose-loader?$'},
      //css-loader 处理@import语法 style-loader把css插入head标签中，执行从右到左
      { test: /\.css$/, use: [MiniCss.loader,'css-loader','postcss-loader'] },
      { test: /\.less$/, use: [MiniCss.loader,'css-loader','postcss-loader','less-loader'] },
      { test: /\.js$/, use: {
        loader:'babel-loader',
        options:{
          presets:['@babel/preset-env'],
          plugins:[
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime'
          ]
          }
        },
        include:path.resolve(__dirname,'src'),
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'src/index.html'),
      filename:'index.html',
      minify:{
        removeAttributeQuotes:true, //去除双引号
        collapseWhitespace:true, //折叠成一行
      },
      hash:true //文件名加入hash值
    }),
    new MiniCss({
      filename:'main.css',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpack([
     { from: __dirname+'/doc', to:__dirname+'/build'}
    ]),
    new Webpack.BannerPlugin(
      'make 2019 by shmilyvidian'
    )
    // new webpack.ProvidePlugin({
    //   $:'jquery'
    // })
    // new OptimizeCssAssets({

    // })
  ],
  devtool:'source-map',
  externals:{
    jquery:'$'
  }
}