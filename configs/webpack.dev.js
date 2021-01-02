const merge = require('webpack-merge');
const common = require('./webpack.config');

const path = require("path");
const context = path.join(__dirname, '..');

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const analysis_port = 9091;
const port = 9090;

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(context, 'dist'),
    compress: false,
    port: port
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: analysis_port,
    }),
  ]
});