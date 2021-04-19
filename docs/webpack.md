# HTMLWebpackPlugin

`HTMLWebpackPlugin` 如果配置了 chunks 项，那么其产物会所固定 chunks 设置的值, 需要谨防其它插件和配置项干涉到 chunks 生产。
  + 比如 `entry.dependOn` , 如果你设置了 `HTMLWebpackPlugin.chunk` 那么 dependOn 的项是不会被正确注入的。

# Modules
## `require.context`
<!-- 关于第三个参数, 要注意 -->

> 第四个参数, 只要模块不立刻在该代码处挂载, 就应该把模式设为 `'lazy'`

这里的逻辑和 webpack 紧密相关, `'sync'` 模式会立刻加载 module, 对性能产生较大影响, 因此, 只要不是在接下来的循环里立刻使用**当前的结果**, 都不应该使用默认值。

为什么强调 “当前的结果”：即使是在循环里马上使用 routes 的信息的情形, 如果是使用 `import()` 动态引入, 实际上我们在此时此刻并没有使用 `sync` 模式所引起的转载结果, 这样会导致资源的重复加载。

如果资源生成产物配置了 hash, 那么这些多余产物还不会被销毁, 而是被错误地持有引用。(如之前遇到的双份 style 样式)