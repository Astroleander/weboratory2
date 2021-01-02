# HTMLWebpackPlugin

`HTMLWebpackPlugin` 如果配置了 chunk 项，其产物会被该选项所固定, 需要谨防其它插件和配置项干涉到 chunk 生产。
  + 比如 `entry.dependOn` 