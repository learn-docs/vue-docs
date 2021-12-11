# API

全局配置：`silent / optionMergeStrategies / devtools / errorHandler / warnHandler / ignoredElements / keyCodes / performance / productionTip`

全局API:` Vue.extend / Vue.nextTick / Vue.set / Vue.delete / Vue.directive / Vue.component / Vue.use / Vue.mixin / Vue.compile / Vue.observable / Vue.version`

选项/数据：`data / props / propsData / methods / watch`

选项/DOM: `el / template / render / renderError`

选项/生命周期钩子：`beforeCreate / created / beforeMount / mounted / activated / deactivated / beforeDestroy / destroyed / errorCaptured`

选项/资源：`directives / filters /components`

选项/组合: `parent / mixins / extends / provide/inject`

选项/其他：`name / delimiters / functional / model / inheritAttrs / comments`

实例property: `vm.$data / vm.$props / vm.$el / vm.$options / vm.$parent / vm.$root / vm.$children / vm.$slots / vm.$scopedSlots / vm.$refs / vm.$isServer / vm.$attrs / vm.$listeners`

实例方法/数据：`vm.$watch / vm.$set / vm.$delete`

实例方法/事件: `vm.$on / vm.$once / vm.$off / vm.$emit`

实例方法/生命周期：`vm.$mount / vm.$forceUpdate / vm.$nextTick / vm.$destroy`

指令：`v-text / v-html / v-show / v-if / v-else / v-else-if / v-for / v-on / v-bind / v-model / v-slot / v-pre / v-cloak / v-once`

特殊attribute: `key / ref / is / slot / slot-scope / scope`

内置的组件：`component / transition / transition-group / keep-alive / slot`

VNode接口 / 服务器端渲染

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

## 全局API

### Vue.extend(options)

参数：`{Object}options`

用法：使用基础 `Vue` 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

`data`选项是特例，需要注意-在 `Vue.extend()`中它必须是函数。

```
<div id="mount-point"></div>
```

```
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}}{{lastName}}aka{{alias}}</p>`,
  data: function() {
    return {
      firstName: 'jeskson',
      lastName: 'jeskson',
      alias: 'dada'
    }
  }
})
// 创建Profile实例，并挂载到一个元素上
new Profile().$mount('#mount-point')
```

结果如下：

```
<p>jeskson jeskson aka dada</p>
```

### Vue.nextTick([callback, context])

参数：`{Function}[callback]` - `{Object}[context]`

用法：在下次`DOM`更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的`DOM`。

```
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function() {
  // DOM 更新了
})
// 作为一个Promise使用
Vue.nextTick()
.then(function() {
  // DOM 更新了
})
```

:::tip
2.1.0 起新增：如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。请注意 Vue 不自带 Promise 的 polyfill，所以如果你的目标浏览器不原生支持 Promise (IE：你们都看我干嘛)，你得自己提供 polyfill。
:::

### Vue.set

`Vue.set( target, propertyName/index, value )`

参数：

`{Object | Array} target`

`{string | number} propertyName/index`

`{any} value`

:::tip
返回值：设置的值。
:::

用法：

向响应式对象中添加一个 `property`，并确保这个新 `property` 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 `property`，因为 Vue 无法探测普通的新增 `property` (比如 `this.myObject.newProperty = 'hi'`)

:::warning
注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。
:::

### Vue.delete(target, propertyName/index)

参数：

`{Object | Array} target`

`{string | number} propertyName/index`

:::tip
仅在 2.2.0+ 版本中支持 Array + index 用法。
:::

用法：

删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。

:::tip
在 2.2.0+ 中同样支持在数组上工作。
:::

:::warning
目标对象不能是一个 Vue 实例或 Vue 实例的根数据对象。
:::

### Vue.directive(id, [definition])

参数：

`{string} id`

`{Function | Object} [definition]`

用法：注册或获取全局指令

```
// 注册
Vue.directive('my-directive', {
  bind: function() {},
  inserted: function() {},
  update： function() {},
  componentUpdated: function() {},
  unbind: function() {}
})

// 注册（指令函数）
Vue.directive('my-directive', function() {
  // 这里将会被 `bind` 和 `update` 调用
})

// getter，返回已注册的指令
var myDirective = Vue.directive('my-directive')
```

### Vue.filter(id,[definition])

参数：

`{string} id`

`{Function} [definition]`

用法：注册或获取全局过滤器

```
// 注册
Vue.filter('my-filter`, function(value) {
  // 返回处理后的值
})

// getter,返回已注册的过滤器
var myFilter = Vue.filter('my-filter')
```

### Vue.component(id, [definition])

参数：

`{string} id`

`{Function | Object} [definition]`

用法：

注册或获取全局文件。注册还会自动使用给定的id设置组件的名称

```
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component`, Vue.extend({ /*...*/ }))

// 注册组件，传入一个选项对象（自动调用Vue.extend)
Vue.component('my-component', { /*...*/ })

// 获取注册的组件（始终返回构造器）
var MyComponent = Vue.component('my-component')
```

### Vue.use(plugin)

参数：

`{Object | Function} plugin`

用法：

安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

该方法需要在调用 new Vue() 之前被调用。

当 install 方法被同一个插件多次调用，插件将只会被安装一次。

### Vue.mixin( mixin )

参数：

`{Object} mixin`

用法：

全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。不推荐在应用代码中使用。

### Vue.compile( template )

参数：

`{string} template`

用法：

将一个模板字符串编译成 render 函数。只在完整版时可用。

```
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```

### Vue.observable(object)

:::tip
2.6.0新增
:::

参数：`{Object} Object`

用法：让一个对象可响应。Vue内部会用它来处理data函数返回的对象

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景：

```
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```

:::warning
在 `Vue 2.x` 中，被传入的对象会直接被 `Vue.observable` 变更，所以如这里展示的，它和被返回的对象是同一个对象。在 `Vue 3.x` 中，则会返回一个可响应的代理，而对源对象直接进行变更仍然是不可响应的。因此，为了向前兼容，我们推荐始终操作使用 `Vue.observable` 返回的对象，而不是传入源对象。
:::

### Vue.version

细节：提供字符串形式的 Vue 安装版本号。这对社区的插件和组件来说非常有用，你可以根据不同的版本号采取不同的策略。

用法：
```
var version = Number(Vue.version.split('.')[0])

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
```

## 选项 / 数据

### data

类型：`Object | Function`

限制：组件的定义只接受 `function`。

详细：

`Vue` 实例的数据对象。`Vue` 会递归地把 `data` 的 `property` 转换为 `getter/setter`，从而让 `data` 的 `property` 能够响应数据变化。对象必须是纯粹的对象 (含有零个或多个的 `key/value`对)：浏览器 `API` 创建的原生对象，原型上的 `property` 会被忽略。大概来说，`data` 应该只能是数据 - 不推荐观察拥有状态行为的对象。

一旦观察过，你就无法在根数据对象上添加响应式 `property`。因此推荐在创建实例之前，就声明所有的根级响应式 `property`。

实例创建之后，可以通过 `vm.$data` 访问原始数据对象。`Vue` 实例也代理了 `data` 对象上所有的 `property`，因此访问 `vm.a` 等价于访问 `vm.$data.a`。

以 `_ 或 $` 开头的 `property` 不会被 Vue 实例代理，因为它们可能和 `Vue` 内置的 `property、API` 方法冲突。你可以使用例如 `vm.$data._property` 的方式访问这些 `property`。

当一个组件被定义，`data` 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 `data` 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 `data` 函数，每次创建一个新实例后，我们能够调用 `data` 函数，从而返回初始数据的一个全新副本数据对象。

如果需要，可以通过将 `vm.$data` 传入 `JSON.parse(JSON.stringify(...))` 得到深拷贝的原始数据对象。

示例：
```
var data = { a: 1 }

// 直接创建一个实例
var vm = new Vue({
  data: data
})
vm.a // => 1
vm.$data === data // => true

// Vue.extend() 中 data 必须是函数
var Component = Vue.extend({
  data: function () {
    return { a: 1 }
  }
})
```
注意，如果你为 data property 使用了箭头函数，则 this 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。
```
data: vm => ({ a: vm.myProp })
```

### props

类型：`Array<string> | Object`

详细：

`props` 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义验证和设置默认值。

你可以基于对象的语法使用以下选项：

`type`：可以是下列原生构造函数中的一种：`String、Number、Boolean、Array、Object、Date、Function、Symbol`、任何自定义构造函数、或上述内容组成的数组。会检查一个 `prop` 是否是给定的类型，否则抛出警告。Prop 类型的更多信息在此。

`default：any`

为该 prop 指定一个默认值。如果该 prop 没有被传入，则换做用这个值。对象或数组的默认值必须从一个工厂函数返回。

`required：Boolean`

定义该 prop 是否是必填项。在非生产环境中，如果这个值为 `truthy` 且该 `prop` 没有被传入的，则一个控制台警告将会被抛出。

`validator：Function`

自定义验证函数会将该 `prop` 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 `falsy` 的值 (也就是验证失败)，一个控制台警告将会被抛出。你可以在这里查阅更多 `prop` 验证的相关信息。

示例：
```
// 简单语法
Vue.component('props-demo-simple', {
  props: ['size', 'myMessage']
})

// 对象语法，提供验证
Vue.component('props-demo-advanced', {
  props: {
    // 检测类型
    height: Number,
    // 检测类型 + 其他验证
    age: {
      type: Number,
      default: 0,
      required: true,
      validator: function (value) {
        return value >= 0
      }
    }
  }
})
```

### propsData

类型：`{ [key: string]: any }`

限制：只用于 `new` 创建的实例中。

详细：

创建实例时传递 `props`。主要作用是方便测试。

示例：
```
var Comp = Vue.extend({
  props: ['msg'],
  template: '<div>{{ msg }}</div>'
})

var vm = new Comp({
  propsData: {
    msg: 'hello'
  }
})
```

### computed

类型：`{ [key: string]: Function | { get: Function, set: Function } }`

详细：

计算属性将被混入到 `Vue` 实例中。所有 `getter` 和 `setter` 的 `this` 上下文自动地绑定为 `Vue` 实例。

注意如果你为一个计算属性使用了箭头函数，则 this 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。
```
computed: {
  aDouble: vm => vm.a * 2
}
```
计算属性的结果会被缓存，除非依赖的响应式 `property` 变化才会重新计算。注意，如果某个依赖 (比如非响应式 `property`) 在该实例范畴之外，则计算属性是不会被更新的。

示例：
```
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取
    aDouble: function () {
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
vm.aPlus   // => 2
vm.aPlus = 3
vm.a       // => 2
vm.aDouble // => 4
```

### methods

类型：`{ [key: string]: Function }`

详细：

`methods` 将被混入到 `Vue` 实例中。可以直接通过 `VM` 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 `Vue` 实例。

:::warning
注意，不应该使用箭头函数来定义 `method` 函数 (例如 `plus: () => this.a++`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 `Vue` 实例，`this.a` 将是 `undefined`。
:::

示例：
```
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
```

### watch

类型：`{ [key: string]: string | Function | Object | Array }`

详细：

一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。`Vue` 实例将会在实例化时调用 `$watch()`，遍历 `watch` 对象的每一个 `property`。

示例：
```
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名
    b: 'someMethod',
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: 'someMethod',
      immediate: true
    },
    // 你可以传入回调数组，它们会被逐一调用
    e: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
        /* ... */
      }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1
```

:::warning
注意，不应该使用箭头函数来定义 `watcher` 函数 (例如 `searchQuery: newValue => this.updateAutocomplete(newValue)`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 `Vue` 实例，`this.updateAutocomplete` 将是 `undefined`。
:::

## 选项/DOM

### el

类型：`string | Element`

限制：只在用 `new` 创建实例时生效

详细：

提供一个在页面上已存在的`DOM`元素 作为 `Vue`实例的挂载目标，可以是css选择器，也可以是一个HTMLElement实例。

在实例挂载之后，元素可以用 `vm.$el` 访问。

如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显示调用 `vm.$mount()` 手动开启编译。

:::warning
提供的元素只能作为挂载点。不同于Vue1.x，所有的挂载元素会被Vue生成的DOM替换。因此不推荐挂载root实例到`<html>`或者`<body>`上。
:::

:::warning
如果 `render` 函数和 `template property` 都不存在，挂载 DOM 元素的 HTML 会被提取出来用作模板，此时，必须使用 `Runtime + Compiler` 构建的 Vue 库。
:::

### template

类型：`string`

详细：

一个字符串模板作为 `Vue` 实例的标识使用。模板将会替换挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。

如果值以 `#` 开始，则它将被用作选择符，并使用匹配元素的 `innerHTML` 作为模板。常用的技巧是用 `<script type="x-template">` 包含模板。

:::warning
出于安全考虑，你应该只使用你信任的 `Vue` 模板。避免使用其他人生成的内容作为你的模板。
:::

:::warning
如果 `Vue` 选项中包含渲染函数，该模板将被忽略。
:::

### render

类型：`(createElement: () => VNode) => VNode`

详细：

字符串模板的代替方案，允许你发挥 `JavaScript` 最大的编程能力。该渲染函数接收一个 `createElement` 方法作为第一个参数用来创建 `VNode`。

如果组件是一个函数组件，渲染函数还会接收一个额外的 `context` 参数，为没有实例的函数组件提供上下文信息。

:::warning
`Vue` 选项中的 `render` 函数若存在，则 `Vue` 构造函数不会从 `template` 选项或通过 `el` 选项指定的挂载元素中提取出的 `HTML` 模板编译渲染函数。
:::

### renderError

:::tip
2.2.0 新增
:::

类型：`(createElement: () => VNode, error: Error) => VNode`

详细：

只在开发者环境下工作。

当 `render` 函数遭遇错误时，提供另外一种渲染输出。其错误将会作为第二个参数传递到 `renderError`。这个功能配合 `hot-reload` 非常实用。

示例：
```
new Vue({
  render (h) {
    throw new Error('oops')
  },
  renderError (h, err) {
    return h('pre', { style: { color: 'red' }}, err.stack)
  }
}).$mount('#app')
```

## 选项/生命周期钩子

:::warning
所有生命周期钩子的 `this` 上下文将自动绑定至实例中，因此你可以访问 `data、computed 和 methods`。这意味着你不应该使用箭头函数来定义一个生命周期方法 (例如 `created: () => this.fetchTodos()`)。因为箭头函数绑定了父级上下文，所以 `this` 不会指向预期的组件实例，并且`this.fetchTodos` 将会是 `undefined`。
:::

### beforeCreate

类型：`Function`

详细：在实例初始化之后，进行数据侦听和事件/侦听器的配置之前同步调用。

### created

类型：`Function`

详细：在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理





















