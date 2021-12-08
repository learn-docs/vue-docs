# API

## 全局配置

:::tip
`Vue.config`是一个对象，包含Vue的全局配置。可以在启动应用之前修改下列property:
:::

### silent

- 类型：`boolean`
- 默认值：`false`
- 用法：
```html
Vue.config.silent = true
```

:::warning
取消`Vue`所有的日志与警告。
:::

### optionMergeStrategies

- 类型：`{ [key: string]: Function }`
- 默认值：`{}`
- 用法：
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

## devtools

- 类型：`boolean`
- 默认值：`true`(生产版本为`false`)
-  用法：
```html
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = true
```

配置是否允许 `vue-devtools` 检查代码。开发版本默认为 true，生产版本默认为 `false`。生产版本设为 `true` 可以启用检查。


















