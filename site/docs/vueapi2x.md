# API

## 全局配置

:::tip
`Vue.config`是一个对象，包含Vue的全局配置。可以在启动应用之前修改下列property:
:::

### silent

类型：`boolean`

默认值：`false`

用法：

```html
Vue.config.silent = true
```

:::warning
取消`Vue`所有的日志与警告。
:::

### optionMergeStrategies

类型：`{ [key: string]: Function }`

默认值：`{}`

用法：

```html
Vue.config.optionMergeStrategies._my_option = function (parent, child, vm) {
  return child + 1
}

const Profile = Vue.extend({
  _my_option: 1
})

// Profile.options._my_option = 2
```

:::warning
自定义合并策略的选项。
:::


合并策略选项分别接收在**父实例**和**子实例**上定义的该选项的值作为第一个和第二个参数，Vue 实例上下文被作为第三个参数传入。

### devtools

类型：`boolean`

默认值：`true`(生产版本为`false`)

用法：

```html
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = true
```

配置是否允许 `vue-devtools` 检查代码。开发版本默认为 true，生产版本默认为 `false`。生产版本设为 `true` 可以启用检查。

### errorHandler

类型：`Function`

默认值：`undefined`

用法：

```html
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
}
```

指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和Vue实例。

:::tip
从 2.2.0 起，这个钩子也会捕获组件生命周期钩子里的错误。同样的，当这个钩子是 undefined 时，被捕获的错误会通过 console.error 输出而避免应用崩溃。
:::

:::tip
从 2.4.0 起，这个钩子也会捕获 Vue 自定义事件处理函数内部的错误了。
:::

:::tip
从 2.6.0 起，这个钩子也会捕获 v-on DOM 监听器内部抛出的错误。另外，如果任何被覆盖的钩子或处理函数返回一个 Promise 链 (例如 async 函数)，则来自其 Promise 链的错误也会被处理。
:::

### warnHandler

:::tip
2.4.0 新增
:::

类型：`Function`

默认值：`undefined`

用法：

```html
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace`是组件的继承关系追踪
}
```

为 Vue 的运行时警告赋予一个自定义处理函数。注意这只会在开发者环境下生效，在生产环境下它会被忽略。

### ignoredElements

类型：`Array<string | RegExp>`

默认值：`[]`

用法：

```
Vue.config.ignoredElements = [
  'my-custom-web-component',
  'another-web-component',
  // 用一个 `RegExp` 忽略所有“ion-”开头的元素
  // 仅在 2.5+ 支持
  /^ion-/
]
```
须使 Vue 忽略在 Vue 之外的自定义元素 (e.g. 使用了 Web Components APIs)。否则，它会假设你忘记注册全局组件或者拼错了组件名称，从而抛出一个关于 Unknown custom element 的警告。

### keyCodes

类型：`{ [key: string]: number | Array<number> }`

默认值：`{}`

用法：

```
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  "media-play-pause": 179,
  up: [38, 87]
}
<input type="text" @keyup.media-play-pause="method">
```
给 v-on 自定义键位别名。

### performance

:::tip
2.2.0 新增
:::

类型：`boolean`

默认值：`false` (自 2.2.3 起)

用法：
:::warning
设置为 true 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。只适用于开发模式和支持 performance.mark API 的浏览器上。
:::

### productionTip
:::tip
2.2.0 新增
:::

类型：`boolean`

默认值：`true`

用法：

设置为 false 以阻止 vue 在启动时生成生产提示。















