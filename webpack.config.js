const path = require('path');
const webpack = require('webpack');
const SassColor = require('node-sass').types.Color;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { lightningLatest, Patch } = require('./warlock-patches');

const iconCache = {
  regular: require('@fortawesome/free-regular-svg-icons'),
  solid: require('@fortawesome/free-solid-svg-icons')
};
const themeColor = 'dc3545';
const routes = require('./html/routes.json');
const patch = new Patch(lightningLatest);

const config = {
  entry: ['./js/app.js'],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8888,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: 'pug-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              functions: {
                'get-theme-color()': function() {
                  return new SassColor(0xff000000 + parseInt(themeColor, 16));
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|webm|mp4)$/,
        exclude: /node_modules/,
        use: [{ loader: 'file-loader', options: { name: 'assets/[hash].[ext]' } }]
      }
    ]
  },
  output: {
    filename: 'assets/app.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  plugins: Object.keys(routes).map(route => new HtmlWebpackPlugin({
    filename: routes[route] + '.html',
    template: route.startsWith('!')
      ? '!!pug-loader!./html/preprocessors/' + route.slice(1)
      : './html/' + route + '.pug',
    templateParameters: { iconCache, routes, currentRoute: route, patch, themeColor }
  }))
};

module.exports = (env, argv) => {
  const production = argv.mode === 'production';

  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(argv.mode)
  }));

  if (!production) {
    config.devServer.hot = true;
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    config.module.rules[2].use[0].loader = MiniCssExtractPlugin.loader;
    config.plugins.push(new MiniCssExtractPlugin({
      filename: 'assets/app.[contenthash].css'
    }));
    config.output.filename = 'assets/app.[contenthash].js';
  }

  return config;
};
