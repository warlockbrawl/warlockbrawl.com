const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = [
  'index',
  'about/index',
  'about/standalones',
  'contact/index',
  'download/index',
  'faq/index',
  'manual/installation/wc3'
];

const config = {
  entry: ['./js/app.js'],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8888
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader'
      },
      {
        test: /\.(png|jpg|gif|webm|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'assets/app.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  plugins: pages.map(page => new HtmlWebpackPlugin({
    filename: page + '.html',
    template: './templates/' + page + '.pug',
    inject: true
  }))
};

module.exports = (env, argv) => {
  const production = argv.mode === 'production';

  // dumb
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(argv.mode)
  }));

  // also dumb
  if (!production) {
    config.devServer.hot = true;
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    // terrible
    config.module.rules[2].use[0].loader = MiniCssExtractPlugin.loader;
    config.plugins.push(new MiniCssExtractPlugin({
      filename: 'assets/app.[contenthash].css'
    }));
    config.output.filename = 'assets/app.[contenthash].js';
  }

  return config;
};
