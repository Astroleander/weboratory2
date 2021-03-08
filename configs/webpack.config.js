const path = require("path");

const context = path.join(__dirname, '..');

const alias = require('./webpack/config.alias');
const entry = require('./webpack/config.entry');
const html  = require('./webpack/config.html');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

const { standardCssLoader } = require("./webpack/config.loader");

/** all entries needs to be recorded */
entry.dependencies = {
  'react-vendors': ['react', 'react-dom', 'react-router-dom', 'react-router', 'prop-types'],
  'vue-vendors': { import: 'vue', runtime: 'vue-vendors-runtime' },
}

entry.entriesList = {
  'lab-graphics': entry.entryFactory('lab-graphics', 'react-vendors'),
  'lab-scenario': entry.entryFactory('lab-scenario', 'react-vendors'),
  'lab-game': entry.entryFactory('lab-game', 'react-vendors'),
  'lab-framework': entry.entryFactory('lab-framework', ['react-vendors', 'vue-vendors']),
  home: entry.entryFactory('home', ['react-vendors', 'vue-vendors']),
}
console.log(entry.entriesList)
module.exports = {
  context,
  target: 'web',
  entry: {
    ...entry.entriesList,
    ...entry.dependencies,
    /** 👇 injected in webpackHTMLplugin */
    'configs': ['./configs/weboratory.common.js']
  },
  output: {
    filename: '[name].bundle.[contenthash:6].js',
    chunkFilename: "chunk.[id].[contenthash:6].js",
    path: path.join(context, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
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
      { test: /\.jsx?$/,  use: 'babel-loader' },
      { test: /\.tsx?$/,  exclude: ['/node-modules/'], 
                          use: "ts-loader", },
      { test: /\.vue$/,   use: "vue-loader", },
      { test: /\.html$/,  exclude: /template\.html$/, 
                          use: { loader: "html-loader", options: { minimize: false }, }, },
      { test: /\.css$/,
        use: standardCssLoader, },
      { test: /\.s[c|a]ss$/,
        use: [
          ...standardCssLoader,
          { loader: "sass-loader" },
        ],
      },
      { test: /\.less$/,
        use: [
          ...standardCssLoader,
          { loader: "less-loader" },
        ], },
    ]
  }
}