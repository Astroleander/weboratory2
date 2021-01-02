const path = require("path");

const context = path.join(__dirname, '..');

const alias = require('./webpack/config.alias');
const entry = require('./webpack/config.entry');
const html  = require('./webpack/config.html');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

/** all entries needs to be recorded */
entry.entriesList = {
  'lab-graphics': entry.entryFactory('lab-graphics', 'react-vendors'),
  'lab-scenario': entry.entryFactory('lab-scenario', 'react-vendors'),
  'lab-framework': entry.entryFactory('lab-game', 'react-vendors'),
  'lab-framework': entry.entryFactory('lab-framework'),
  home: entry.entryFactory('home', 'react-vendors'),
}

module.exports = {
  context,
  target: 'web',
  entry: {
    ...entry.entriesList,
    'react-vendors': ['react', 'react-dom'],
    'configs': ['./configs/weboratory.common.js'],
  },
  output: {
    filename: '[name].bundle.[contenthash:6].js',
    chunkFilename: "chunk.[id].[contenthash:6].js",
    path: path.join(context, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue'],
    alias: alias.aliasFactory(context),
    modules: [path.join(context, 'src'), 'node_modules']
  },
  plugins: [
    ...html.htmlpluginBatchFactory(entry.entriesList),
    new DefinePlugin({
      ENTRIES: JSON.stringify(Object.keys(entry.entriesList)),
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:6].css",
      chunkFilename: "chunk.[id].[contenthash:6].css",
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/,  exclude: ['/node-modules/'], 
                          use: "ts-loader",  },
      { test: /\.vue$/,   use: "vue-loader",  },
      { test: /\.html$/,  exclude: /template\.html$/, 
                          use: { loader: "html-loader", options: { minimize: false }, }, },
      { test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", 
            options: { 
              modules: { auto: true, localIdentName: '[local]-[contenthash:12]' } 
            }, },
        ], },
    ]
  }
}