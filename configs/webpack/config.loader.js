const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const standardCssLoader = [
  { loader: MiniCssExtractPlugin.loader },
  {
    loader: 'css-loader',
    options: {
      modules: { auto: true, localIdentName: '[local]_MODULE_[contenthash:6]' }
    }
  }
];

module.exports = {
  standardCssLoader,
}