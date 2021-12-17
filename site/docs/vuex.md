# vuex

## `Vuex` 是什么？
`Vuex` 是一个专为 `Vue.js` 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。`Vuex` 也集成到 `Vue` 的官方调试工具 `devtools extension (opens new window)`，提供了诸如零配置的 `time-travel` 调试、状态快照导入导出等高级调试功能。

### 什么是“状态管理模式”？

让我们从一个简单的 `Vue` 计数应用开始：

```js
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

这个状态自管理应用包含以下几个部分：

- `state` ，驱动应用的数据源；
- `view` ，以声明方式将 `state` 映射到视图；
- `actions` ，响应在 `view` 上的用户输入导致的状态变化。

以下是一个表示“单向数据流”理念的简单示意：

<img src="../../assets/flow.png" style="display: flex; margin: auto; width: 60%;"/>

但是，当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。

`Vuex` 是专门为 `Vue.js` 设计的状态管理库，以利用 `Vue.js` 的细粒度数据响应机制来进行高效的状态更新。

<img src="../../assets/vuex.png" style="display: flex; margin: auto; width: 80%;"/>

### 什么情况下我应该使用 Vuex？

开发大型单页应用

## 安装

### 直接下载 / `CDN` 引用

在 `Vue` 之后引入 `vuex` 会进行自动安装：
```js
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
```

### NPM

```js
npm install vuex --save
```

### Yarn

```js
yarn add vuex
```

在一个模块化的打包系统中，您必须显式地通过 `Vue.use()` 来安装 `Vuex：`
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```
当使用全局 `script` 标签引用 `Vuex` 时，不需要以上安装过程。

### Promise

`Vuex` 依赖 `Promise (opens new window)`。如果你支持的浏览器并没有实现 `Promise` (比如 `IE`)，那么你可以使用一个 `polyfill` 的库，例如 `es6-promise (opens new window)。`

你可以通过 `CDN` 将其引入：

```js
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>
```

然后 `window.Promise` 会自动可用。

如果你喜欢使用诸如 `npm` 或 `Yarn` 等包管理器，可以按照下列方式执行安装：

```js
npm install es6-promise --save # npm
yarn add es6-promise # Yarn
```

或者更进一步，将下列代码添加到你使用 `Vuex` 之前的一个地方：

```js
import 'es6-promise/auto'
```

### 自己构建

如果需要使用 `dev` 分支下的最新版本，您可以直接从 `GitHub` 上克隆代码并自己构建。

```js
git clone https://github.com/vuejs/vuex.git node_modules/vuex
cd node_modules/vuex
npm install
npm run build
```



























