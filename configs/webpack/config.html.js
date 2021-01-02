const fs = require("fs");
const path = require("path");

const HTMLWebpackPlugin = require('html-webpack-plugin');

const parseHTMLWebpackPluginOption = (name, htmlOption) => {
  return [name, htmlOption.dependOn].flat()
}

const hwpFactory = (name, chunks) => {
  return new HTMLWebpackPlugin({
    /** [ 👇 特性 ] 在 .html 中使用 <%= [htmlWebpackPlugin.options.xxxx] %> 来使用自定义变量, 代价是不能使用 html-loader */
    /** [ 🥊 竞争 ] html-loader 同样有自己的方案, 你可以选择任意的模板语法, 然后使用 preprocessor 来处理你的模板 @see https://webpack.js.org/loaders/html-loader/#templating */
    id:           name.replace(/^lab/, 'laboratory'),

    template:     `./template.html`,
    filename:     name === 'home' ? `./index.html` : `./${name}/index.html`,
    chunks:       [`configs`, ...chunks],
    contenthash:  true,
    minify:       { collapseInlineTagWhitespace: true },
  })
}

const htmlpluginBatchFactory = (htmlOptionList) => {
  const templatelist = [];
  Object.keys(htmlOptionList).forEach((name) => {
    let chunklist = parseHTMLWebpackPluginOption(name, htmlOptionList[name]);
    templatelist.push(hwpFactory(name, chunklist));
  });
  return templatelist;
}

module.exports = {
  htmlpluginBatchFactory
}