const { merge } = require('webpack-merge');
const common = require('./webpack.config');

const path = require("path");
const context = path.join(__dirname, '..');

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const PORT = 12450;
const ANALYSIS_PORT = PORT + 1;

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(context, 'dist'),
    compress: false,
    port: PORT
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: ANALYSIS_PORT,
      excludeAssets: /vendor|configs/
    }),
  ]
});