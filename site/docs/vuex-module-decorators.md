# vuex-module-decorators

`Usage Guide Detailed Guide: https://championswimmer.in/vuex-module-decorators/`

使用指南详细指南:`https://championswimmer.in/vuex-module-decorators/`

`Typescript/ES7 Decorators to make Vuex modules a breeze`

`Typescript/ES7`装饰器，让`Vuex`模块变得轻而易举

安装`Installation`

`npm install -D vuex-module-decorators`

`Babel 6/7`

:::tip
NOTE This is not necessary for vue-cli@3 projects, since @vue/babel-preset-app already includes this plugin
:::

说明这不是必要的`vue-cli@3`项目，因为`@vue/babel-preset-ap`p已经包括这个插件

`You need to install babel-plugin-transform-decorators`

你需要安装`babel-plugin-transform-decorator`

TypeScript

`set experimentalDecorators to true` 设置`experimentalDecorators`为真

`For reduced code with decorators, set importHelpers: true in tsconfig.json`-对于带有装饰器的简化代码，在`tsconfig.json`中设置`importHelpers: true`

`(only for TypeScript 2) set emitHelpers: true in tsconfig.json`-(仅针对`TypeScript 2`)在`tsconfig.json`中设置`emitHelpers: true`

`Configuration`配置

`Using with target: es5`-与目标一起使用:es5

`NOTE Since version 0.9.3 we distribute as ES5, so this section is applicable only to v0.9.2 and below`

注:由于`0.9.3`版本是作为ES5发布的，所以本节只适用于`v0.9.2`及以下版本

`This package generates code in es2015 format. If your Vue project targets ES6 or ES2015 then you need not do anything. But in case your project uses es5 target (to support old browsers), then you need to tell Vue CLI / Babel to transpile this package.`

这个包生成`es2015`格式的代码。如果您的`Vue`项目针对`ES6`或`ES2015`，那么您不需要做任何事情。但如果您的项目使用`es5`目标(以支持旧浏览器)，那么您需要告诉`Vue CLI / Babel`来编译这个包。

```js
// in your vue.config.js
module.exports = {
  /* ... other settings */
  transpileDependencies: ['vuex-module-decorators']
}

Usage

The conventional old & boring way
Remember how vuex modules used to be made ?

const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

`Hello Decorators !`

`Well not anymore. Now you get better syntax. Inspired by vue-class-component`

现在不是了。现在你得到了更好的语法。灵感来自`vue-class-component`

```js
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module
export default class Counter2 extends VuexModule {
  count = 0

  @Mutation
  increment(delta: number) {
    this.count += delta
  }
  @Mutation
  decrement(delta: number) {
    this.count -= delta
  }

  // action 'incr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: 'increment' })
  incr() {
    return 5
  }
  // action 'decr' commits mutation 'decrement' when done with return value as payload
  @Action({ commit: 'decrement' })
  decr() {
    return 5
  }
}
```

`async MutationAction === magic`

`Want to see something even better ?`

```js
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { ConferencesEntity, EventsEntity } from '@/models/definitions'

@Module
export default class HGAPIModule extends VuexModule {
  conferences: Array<ConferencesEntity> = []
  events: Array<EventsEntity> = []

  // 'events' and 'conferences' are replaced by returned object
  // whose shape must be `{events: [...], conferences: [...] }`
  @MutationAction({ mutate: ['events', 'conferences'] })
  async fetchAll() {
    const response: Response = await getJSON('https://hasgeek.github.io/events/api/events.json')
    return response
  }
}

Automatic getter detection

@Module
class MyModule extends VuexModule {
  wheels = 2

  @Mutation
  incrWheels(extra) {
    this.wheels += extra
  }

  get axles() {
    return this.wheels / 2
  }
}

这是等价的

const module = {
  state: { wheels: 2 },
  mutations: {
    incrWheels(state, extra) {
      state.wheels += extra
    }
  },
  getters: {
    axles: (state) => state.wheels / 2
  }
}
```

`Putting into the store`

放进`store`

`Use the modules just like you would earlier`

像以前一样使用模块

```js
import Vue from 'nativescript-vue'
import Vuex, { Module } from 'vuex'

import counter from './modules/Counter2'
import hgapi from './modules/HGAPIModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  modules: {
    counter,
    hgapi
  }
})
```

模块重用，与`NuxtJS`一起使用

如果你需要支持模块重用或者在`NuxtJS`中使用模块，你可以使用`@Module`的`stateFactory`选项来生成一个状态工厂函数，而不是一个静态状态对象实例，如下所示:

`Module re-use, use with NuxtJS`

`If you need to support module reuse or to use modules with NuxtJS, you can have a state factory function generated instead of a static state object instance by using stateFactory option to @Module, like so:`

```js
@Module({ stateFactory: true })
class MyModule extends VuexModule {
  wheels = 2

  @Mutation
  incrWheels(extra) {
    this.wheels += extra
  }

  get axles() {
    return this.wheels / 2
  }
}

this is turned into the equivalent

const module = {
  state() {
    return { wheels: 2 }
  },

  mutations: {
    incrWheels(state, extra) {
      state.wheels += extra
    }
  },
  getters: {
    axles: (state) => state.wheels / 2
  }
}
```

`Dynamic Modules`

`Vuex allows us to register modules into store at runtime after store is constructed. We can do the following to create dynamic modules`

动态模块

`Vuex`允许我们在`store`构建完成后在运行时将模块注册到`store`中。我们可以执行以下操作来创建动态模块

```js
interface StoreType {
  mm: MyModule
}
// Declare empty store first
const store = new Vuex.Store<StoreType>({})

// Create module later in your code (it will register itself automatically)
// In the decorator we pass the store object into which module is injected
// NOTE: When you set dynamic true, make sure you give module a name
@Module({ dynamic: true, store: store, name: 'mm' })
class MyModule extends VuexModule {
  count = 0

  @Mutation
  incrCount(delta) {
    this.count += delta
  }
}
```

如果你想保存状态，例如从`vuex-persist`加载状态时

`If you would like to preserve the state e.g when loading in the state from vuex-persist`

或者当它没有初始状态时，你从`localStorage`加载状态

```js
...

-- @Module({ dynamic: true, store: store, name: 'mm' })
++ @Module({ dynamic: true, store: store, name: 'mm', preserveState: true })
class MyModule extends VuexModule {

...
Or when it doesn't have a initial state and you load the state from the localStorage

...

-- @Module({ dynamic: true, store: store, name: 'mm' })
++ @Module({ dynamic: true, store: store, name: 'mm', preserveState: localStorage.getItem('vuex') !== null })
class MyModule extends VuexModule {

...
```

使用`NuxtJS`访问模块

构建模块有许多可能的方法。这里有一种与`NuxtJS`一起使用的方法(你只需要将你的模块添加到`~/utils/store-accessor.ts `中，然后直接从`~/store`导入模块):

`Accessing modules with NuxtJS`

`There are many possible ways to construct your modules. Here is one way for drop-in use with NuxtJS (you simply need to add your modules to ~/utils/store-accessor.ts and then just import the modules from ~/store):`

```js
~/store/index.ts:

import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accessor'
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accessor'

~/utils/store-accessor.ts:

import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import example from '~/store/example'

let exampleStore: example

function initialiseStores(store: Store<any>): void {
  exampleStore = getModule(example, store)
}

export { initialiseStores, exampleStore }
```

现在，您可以以类型安全的方式访问存储，只需在组件或页面中执行以下操作—不需要额外的初始化。

`Now you can access stores in a type-safe way by doing the following from a component or page - no extra initialization required.`

```js
import { exampleStore } from '~/store'
...
someMethod() {
  return exampleStore.exampleGetter
}
```

使用`ServerSideRender`装饰器

当涉及到`SSR`时，存储将在每个请求上重新创建。每次使用`getModule`函数访问模块时，必须提供当前的`store`实例，并且必须手动将该模块注册到根存储模块

`Using the decorators with ServerSideRender`

`When SSR is involved the store is recreated on each request. Every time the module is accessed using getModule function the current store instance must be provided and the module must be manually registered to the root store modules`

```js
// store/modules/MyStoreModule.ts
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'modules/MyStoreModule',
  namespaced: true,
  stateFactory: true,
})
export default class MyStoreModule extends VuexModule {
  public test: string = 'initial'

  @Mutation
  public setTest(val: string) {
    this.test = val
  }
}


// store/index.ts
import Vuex from 'vuex'
import MyStoreModule from '~/store/modules/MyStoreModule'

export function createStore() {
  return new Vuex.Store({
    modules: {
      MyStoreModule,
    }
  })
}

// components/Random.tsx
import { Component, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import MyStoreModule from '~/store/modules/MyStoreModule'

@Component
export default class extends Vue {
    public created() {
        const MyModuleInstance = getModule(MyStoreModule, this.$store);
        // Do stuff with module
        MyModuleInstance.setTest('random')
    }
}
```

配置

有一个全局配置对象，可以用来设置整个模块的选项:

`Configuration`

`There is a global configuration object that can be used to set options across the whole module:`

```js
import { config } from 'vuex-module-decorators'
// Set rawError to true by default on all @Action decorators
config.rawError = true
//在所有@Action装饰器上默认设置rawError为true
```

使用这个库，您可以编写`vuex`这种格式的模块 -

```js
// eg. /app/store/posts.ts
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { get } from 'axios'

interface PostEntity {
  comments: string[]
}

@Module
export default class Posts extends VuexModule {
  posts: PostEntity[] = [] // initialize empty for now

  get totalComments(): number {
    return this.posts
      .filter(post => {
        // Take those posts that have comments
        return post.comments && post.comments.length
      })
      .reduce((sum, post) => {
        // Sum all the lengths of comments arrays
        return sum + post.comments.length
      }, 0)
  }

  @Mutation
  updatePosts(posts: PostEntity[]) {
    this.posts = posts
  }

  @Action({ commit: 'updatePosts' })
  async fetchPosts() {
    return get('https://jsonplaceholder.typicode.com/posts')
  }
}
```

结果`/app/store/posts`文件输出将是

```js
// equivalent eg. /app/store/posts.js
module.exports = {
  state: {
    posts: []
  },
  getters: {
    totalComments: (state) => {
      return state.posts
        .filter((post) => {
          return post.comments && post.comments.length
        })
        .reduce((sum, post) => {
          return sum + post.comments.length
        }, 0)
    }
  },
  mutations: {
    updatePosts: (state, posts) => {
      // 'posts' is payload
      state.posts = posts
    }
  },
  actions: {
    fetchPosts: async (context) => {
      // the return of the function is passed as payload
      const payload = await get('https://jsonplaceholder.typicode.com/posts')
      // the value of 'commit' in decorator is the mutation used
      context.commit('updatePosts', payload)
    }
  }
}
```

## 类型安全的好处

而不是使用通常的方式来调度和提交`......`

```js
store.commit('updatePosts', posts)
await store.dispatch('fetchPosts')
```

`......`这不提供类型安全的有效载荷和在IDE中没有自动完成的帮助，您现在可以使用更多的使用类型安全的机制`getModule`访问

```js
import { getModule } from 'vuex-module-decorators'
import Posts from `~/store/posts.js`

const postsModule = getModule(Posts)

// access posts
const posts = postsModule.posts

// use getters
const commentCount = postsModule.totalComments

// commit mutation
postsModule.updatePosts(newPostsArray)

// dispatch action
await postsModule.fetchPosts()
```

## 定义一个模块

要定义一个模块，请创建一个从装饰器扩展`VuexModule` 并且必须用`Module`装饰器装饰的类

```js
// eg. /app/store/mymodule.ts
import { Module, VuexModule } from 'vuex-module-decorators'

@Module
export default class MyModule extends VuexModule {
  someField: string = 'somedata'
}
```

:::tip
小心

包中也有一个`Module`类`vuex`，它不是装饰器。确保从 from 导入正确的模块装饰器 `vuex-module-decorators`

❌ `import {Module} from 'vuex'`
✔️ `import {Module} from 'vuex-module-decorators'`
:::

## store使用

您将`MyModule`类本身用作模块。

```js
import Vuex from 'vuex'
import MyModule from '~/store/mymodule'

const store = new Vuex.Store({
  modules: {
    myMod: MyModule
  }
})
```

:::tip
笔记

我们使用 `MyModule` 类的方式不同于经典的面向对象编程，类似于`vue-class-component` 的工作方式。我们使用类本身作为模块，而不是类构造的对象

`new MyModule()` ❌
:::

## 访问状态

访问模块的所有常用方法都有效 -

1.

```js
import store from '~/store'

store.state.myMod.someField
```

2.

`this.$store`在组件中使用`if`

```js
this.$store.state.myMod.someField
```

除此之外，对于更类型安全的访问，我们可以使用 `getModule()`

使用`getModule()`创建类型安全的访问

```js
import { Module, VuexModule, getModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({ dynamic: true, store, name: 'mymod' })
class MyModule extends VuexModule {
  someField: number = 10
}
const myMod = getModule(MyModule)
myMod.someField //works
myMod.someOtherField //Typescript will error, as field doesn't exist
```

## 状态

类的所有属性都转换为状态道具。例如，以下代码 -

```js
import { Module, VuexModule } from 'vuex-module-decorators'

@Module
export default class Vehicle extends VuexModule {
  wheels = 2
}
```

相当于这个——

```js
export default {
  state: {
    wheels: 2
  }
}
```

:::warning
🚨 警告

如果无法确定状态值，则必须使用`null.` 就像`wheels: number | null = null.`
:::

## 类的所有 `ES6 getter` 函数都转换为 `vuex getter`

例如，以下代码 -

```js
import { Module, VuexModule } from 'vuex-module-decorators'

@Module
export default class Vehicle extends VuexModule {
  wheels = 2
  get axles() {
    return this.wheels / 2
  }
}
```

相当于这个——

```js
export default {
  state: {
    wheels: 2
  },
  getters: {
    axles: (state) => state.wheels / 2
  }
}
```

对于 `Method-Style Access` 使用 `vanilla vuex` 并返回一个函数：

```js
@Module
export default class Vehicle extends VuexModule {
  companies = []
  get company() {
    return (companyName: string) => { this.companies.find(company => company.name === companyName) };
  }
}
```

## `@Mutation`

修饰的所有函数`@Mutation`都转换成`Vuex`的`mutations` 例如下面的代码——

```js
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module
export default class Vehicle extends VuexModule {
  wheels = 2

  @Mutation
  puncture(n: number) {
    this.wheels = this.wheels - n
  }
}
```

相当于这个——

```js
export default {
  state: {
    wheels: 2
  },
  mutations: {
    puncture: (state, payload) => {
      state.wheels = state.wheels - payload
    }
  }
}
```

:::tip
笔记

一旦用`@Mutation`装饰器装饰`Mutations`运行时会将此（上下文）设置为`state` 所以当你想改变 `state` 中的东西时， `state.item++`很简单`this.item++`
:::

:::warning
🚨 警告

变异函数不能是异步函数。也不要将它们定义为箭头➡️功能，因为我们需要在运行时重新绑定他们。
:::















