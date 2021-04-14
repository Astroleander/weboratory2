# HTMLWebpackPlugin

`HTMLWebpackPlugin` 如果配置了 chunks 项，那么其产物会所固定 chunks 设置的值, 需要谨防其它插件和配置项干涉到 chunks 生产。
  + 比如 `entry.dependOn` , 如果你设置了 `HTMLWebpackPlugin.chunk` 那么 dependOn 的项是不会被正确注入的。