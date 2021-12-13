# Cookbook

## 添加实例 `property`

### 基本的示例

你可能会在很多组件里用到数据/实用工具，但是不想**污染全局作用域**。这种情况下，你可以通过在原型上定义它们使其在每个 `Vue` 的实例中可用。

```js
Vue.prototype.$appName = 'My App'
```

这样 `$appName` 就在所有的 `Vue` 实例中可用了，甚至在实例被创建之前就可以。如果我们运行：

```js
new Vue({
  beforeCreate: function () {
    console.log(this.$appName)
  }
})
```

则控制台会打印出 `My App`。就这么简单！

### 为实例 `property` 设置作用域的重要性

你可能会好奇：

:::tip
“为什么 `appName` 要以 `$` 开头？这很重要吗？它会怎样？”
:::

这里没有什么魔法。`$` 是在 `Vue` 所有实例中都可用的 `property` 的一个简单约定。这样做会避免和已被定义的数据、方法、计算属性产生冲突。

:::tip
“你指的冲突是什么意思？”
:::

另一个好问题！如果你写成：

```js
Vue.prototype.appName = 'My App'
```

那么你希望下面的代码输出什么呢？

```js
new Vue({
  data: {
    // 啊哦，`appName` *也*是一个我们定义的实例 property 名！😯
    appName: 'The name of some other app'
  },
  beforeCreate: function () {
    console.log(this.appName)
  },
  created: function () {
    console.log(this.appName)
  }
})
```

日志中会先出现 `"My App"`，然后出现 `"The name of some other app"`，因为 `this.appName` 在实例被创建之后被 `data` 覆写了。我们通过 `$` 为实例 `property` 设置作用域来避免这种事情发生。你还可以根据你的喜好使用自己的约定，诸如 `$_appName` 或 `ΩappName`，来避免和插件或未来的插件相冲突。

### 真实的示例：通过 `axios` 替换 `Vue Resource`

比如你打算替换已经废弃的 `Vue Resource` 库。你实在是很喜欢通过 `this.$http` 来访问请求方法，希望换成 `axios` 以后还能继续这样用。

你需要做的事情是把 `axios` 引入你的项目：

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.15.2/axios.js"></script>

<div id="app">
  <ul>
    <li v-for="user in users">{{ user.name }}</li>
  </ul>
</div>
```

设置 `Vue.prototype.$http` 为 `axios` 的别名：

```js
Vue.prototype.$http = axios
```

然后你就可以在任何 `Vue` 实例中使用类似 `this.$http.get` 的方法：

```js
new Vue({
  el: '#app',
  data: {
    users: []
  },
  created () {
    var vm = this
    this.$http
      .get('https://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        vm.users = response.data
      })
  }
})
```

### 原型方法的上下文

你可能没有意识到，在 `JavaScript` 中一个原型的方法会获得该实例的上下文。也就是说它们可以使用 `this` 访问数据、计算属性、方法或其它任何定义在实例上的东西。

让我们将其用在一个名为 `$reverseText` 的方法上：

```js
Vue.prototype.$reverseText = function (propertyName) {
  this[propertyName] = this[propertyName]
    .split('')
    .reverse()
    .join('')
}

new Vue({
  data: {
    message: 'Hello'
  },
  created: function () {
    console.log(this.message) // => "Hello"
    this.$reverseText('message')
    console.log(this.message) // => "olleH"
  }
})
```

注意如果你使用了 `ES6/2015` 的箭头函数，则其绑定的上下文不会正常工作，因为它们会隐式地绑定其父级作用域。也就是说使用箭头函数的版本：

```js
Vue.prototype.$reverseText = propertyName => {
  this[propertyName] = this[propertyName]
    .split('')
    .reverse()
    .join('')
}
```

会抛出一个错误：

```js
Uncaught TypeError: Cannot read property 'split' of undefined
```

### 何时避免使用这个模式

只要你对原型 `property` 的作用域保持警惕，那么使用这个模式就是安全的——保证了这一点，就不太会出 `bug。`

然而，有的时候它会让其他开发者感到混乱。例如他们可能看到了 `this.$http`，然后会想“哦，我从来没见过这个 `Vue` 的功能”，然后他们来到另外一个项目又发现 `this.$http` 是未被定义的。或者你打算去搜索如何使用它，但是搜不到结果，因为他们并没有发现这是一个 `axios` 的别名。

这种便利是以显性表达为代价的。当我们查阅一个组件的时候，要注意交代清楚 `$http` 是从哪来的：`Vue` 自身、一个插件、还是一个辅助库？

那么有别的替代方案吗？

### 替代方案

**当没有使用模块系统时**

在没有模块系统 (比如 `webpack` 或 `Browserify`) 的应用中，存在一种任何重 JS 前端应用都常用的模式：一个全局的 App 对象。

如果你想要添加的东西跟 `Vue` 本身没有太多关系，那么这是一个不错的替代方案。举个例子：

```js
var App = Object.freeze({
  name: 'My App',
  version: '2.1.4',
  helpers: {
    // 这是我们之前见到过的 `$reverseText` 方法
    // 的一个纯函数版本
    reverseText: function (text) {
      return text
        .split('')
        .reverse()
        .join('')
    }
  }
})
```

:::warning
如果你在好奇 `Object.freeze`，它做的事情是阻止这个对象在未来被修改。这实质上是将它的 `property` 都设为了常量，避免在未来出现状态的 `bug。`
:::

现在这些被共享的 `property` 的来源就更加明显了：在应用中的某个地方有一个被定义好的 `App` 对象。你只需在项目中搜索就可以找到它。

这样做的另一个好处是 `App` 可以在你代码的任何地方使用，不管它是否是 `Vue` 相关的。包括向实例选项直接附加一些值而不必进入一个函数去访问 `this` 上的 `property` 来得到这些值：

```js
new Vue({
  data: {
    appVersion: App.version
  },
  methods: {
    reverseText: App.helpers.reverseText
  }
})
```

**当使用模块系统时**

当使用模块系统的时候，你可以轻松地把共享的代码组织成模块，然后把那些模块 `require/import` 到任何你所需要的地方。这是一个典型的显式做法，因为在每个文件里你都能得到一份依赖清单。你可以准确地知道每个依赖的来历。

虽然毫无疑问它更啰嗦，但是这种方法确实是最可维护的，尤其是当和多人一起协作一个大型应用的时候。

## 表单校验

### 基本的示例

表单校验是浏览器原生支持的，但是有的时候用不同的浏览器处理起来需要一些小技巧。即使当表单校验已经被完美支持，你也还是有很多时候需要进行自定义的校验。这时一个更加手动的基于 `Vue` 的解决方案可能会更适合。我们来看一个简单的示例。

给定一个表单，包含三个字段，其中两个是必填项。我们先来看看 `HTML：`

```js
<form
  id="app"
  @submit="checkForm"
  action="https://vuejs.org/"
  method="post"
>

  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="name">Name</label>
    <input
      id="name"
      v-model="name"
      type="text"
      name="name"
    >
  </p>

  <p>
    <label for="age">Age</label>
    <input
      id="age"
      v-model="age"
      type="number"
      name="age"
      min="0"
    >
  </p>

  <p>
    <label for="movie">Favorite Movie</label>
    <select
      id="movie"
      v-model="movie"
      name="movie"
    >
      <option>Star Wars</option>
      <option>Vanilla Sky</option>
      <option>Atomic Blonde</option>
    </select>
  </p>

  <p>
    <input type="submit" value="Submit">
  </p>

</form>
```

我们从头到尾看一遍，这个 `<form>` 标记上有一个我们将会用在 `Vue` 组件上的 `ID`。这里有一个你稍后会看到的 `submit` 处理函数，而这里的 `action` 是一个可能指向了某个真实服务器的临时 `URL` (当然你在服务端也是要有校验的)。

下面有一段内容，会根据错误状态进行显示或隐藏。它将会在表单的最顶端渲染一个简单的错误列表。同时要注意我们会在提交的时候进行校验，而不是每个字段被修改的时候。

最后值得注意的是这三个字段都有一个对应的 `v-model` 来连接它们的值，我们将会在 `JavaScript` 中使用它。现在我们就来看一下。
```js
const app = new Vue({
  el: '#app',
  data: {
    errors: [],
    name: null,
    age: null,
    movie: null
  },
  methods:{
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.age) {
        this.errors.push('Age required.');
      }

      e.preventDefault();
    }
  }
})
```
非常短小精悍。我们定义了一个数组来放置错误，并将这三个表单字段的默认值设为 `null。checkForm` 的逻辑 (在表单提交时运行) 只会检查姓名和年龄，因为电影是选填的。如果它们是空的，那么我们会检查每一个字段并设置相应的错误，差不多就是这样。你可以在下面运行这个 `demo`。不要忘记提交成功时它会 `POST` 到一个临时的 `URL。`

### 使用自定义校验

对于第二个示例来说，第二个文本字段 (年龄) 变换成了电子邮件地址，它将会通过一些自定义的逻辑来校验。这部分代码来自 `StackOverflow` 的问题：如何在 `JavaScript` 中校验电子邮件地址。这是一个很好的问题，因为它会让 `Facebook` 上最激烈的政治、宗教争论看上去都只是“哪家的啤酒最好喝”这样的小分歧了。讲真的这很疯狂。我们来看 `HTML`，尽管它和第一个例子很接近。

```js
<form
  id="app"
  @submit="checkForm"
  action="https://vuejs.org/"
  method="post"
  novalidate="true"
>

  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="name">Name</label>
    <input
      id="name"
      v-model="name"
      type="text"
      name="name"
    >
  </p>

  <p>
    <label for="email">Email</label>
    <input
      id="email"
      v-model="email"
      type="email"
      name="email"
    >
  </p>

  <p>
    <label for="movie">Favorite Movie</label>
    <select
      id="movie"
      v-model="movie"
      name="movie"
    >
      <option>Star Wars</option>
      <option>Vanilla Sky</option>
      <option>Atomic Blonde</option>
    </select>
  </p>

  <p>
    <input
      type="submit"
      value="Submit"
    >
  </p>

</form>
```

尽管这里的不同点很小，注意顶端的 `novalidate="true"`。但是这很重要，因为浏览器会尝试在 `type="email"` 的字段校验邮件地址。坦白说在这个案例中浏览器的校验规则是值得信任的，不过我们想要创建一个自定义校验的例子，所以把它禁用了。以下是更新后的 `JavaScript。`

```js
const app = new Vue({
  el: '#app',
  data: {
    errors: [],
    name: null,
    email: null,
    movie: null
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (!this.name) {
        this.errors.push("Name required.");
      }
      if (!this.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
})
```
如你所见，我们添加了一个新方法 `validEmail`，它将会在 `checkForm` 中被调用了。

### 另一个自定义校验的例子

在第三个示例中，我们已经构建了一些你可能在一些调研类应用中见过的东西。用户需要花掉“预算”来为歼星舰模型装配一套部件。总价必须等于 100。先看 `HTML。`

```js
<form
  id="app"
  @submit="checkForm"
  action="https://vuejs.org/"
  method="post"
  novalidate="true"
>

  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p>
    Given a budget of 100 dollars, indicate how much
    you would spend on the following features for the
    next generation Star Destroyer. Your total must sum up to 100.
  </p>

  <p>
    <input
      v-model.number="weapons"
      type="number"
      name="weapons"
    > Weapons <br/>
    <input
      v-model.number="shields"
      type="number"
      name="shields"
    > Shields <br/>
    <input
      v-model.number="coffee"
      type="number"
      name="coffee"
    > Coffee <br/>
    <input
      v-model.number="ac"
      type="number"
      name="ac"
    > Air Conditioning <br/>
    <input
      v-model.number="mousedroids"
      type="number"
      name="mousedroids"
    > Mouse Droids <br/>
  </p>

  <p>
    Current Total: {{total}}
  </p>

  <p>
    <input
      type="submit"
      value="Submit"
    >
  </p>

</form>
```

这组输入框覆盖了五个不同的部件。注意这里为 `v-model attribute` 添加了 `.number`。它会告诉 `Vue` 将其值作为数字来使用。不过这里有一个小小的 `bug`，那就是当其值为空的时候，它会回到字符串格式，稍后你将会看到变通的办法。为了让用户使用起来更方便，我们添加展示了一个当前的总和，这样我们就能够实时的看到它们一共花掉了多少钱。现在我们来看看 `JavaScript。`

```js
const app = new Vue({
  el: '#app',
  data:{
    errors: [],
    weapons: 0,
    shields: 0,
    coffee: 0,
    ac: 0,
    mousedroids: 0
  },
  computed: {
     total: function () {
       // 必须解析，因为 Vue 会将空值转换为字符串
       return Number(this.weapons) +
         Number(this.shields) +
         Number(this.coffee) +
         Number(this.ac+this.mousedroids);
     }
  },
  methods:{
    checkForm: function (e) {
      this.errors = [];

      if (this.total != 100) {
        this.errors.push('Total must be 100!');
      }

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    }
  }
})
```

我们将总和设置为了一个计算属性，从那个我们解决掉的 `bug` 外面看上去，这已经足够了。我的 `checkForm` 方法现在只需要关注总和是不是 `100` 了。

### 服务端校验

在我们最终的示例中，我们构建了一些用到 `Ajax` 的服务端校验的东西。这个表单将会问你为一个新产品起名字，并且将会确保这个名字是唯一的。我们快速写了一个 `Netlify` 的 `serverless action` 来进行这个校验。虽然这不是非常重要，但其逻辑如下：

```js
exports.handler = async (event, context) => {
  
    const badNames = ['vista', 'empire', 'mbp'];
    const name = event.queryStringParameters.name;

    if (badNames.includes(name)) {
      return { 
        statusCode: 400,         
        body: JSON.stringify({error: 'Invalid name passed.'}) 
      }
    }

    return {
      statusCode: 204
    }
}
```

基本上除了`“vista”、“empire”和“mbp”`的名字都是可以接受的。好，让我们来看看表单。

```js
<form
  id="app"
  @submit="checkForm"
  method="post"
>

  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="name">New Product Name: </label>
    <input
      id="name"
      v-model="name"
      type="text"
      name="name"
    >
  </p>

  <p>
    <input
      type="submit"
      value="Submit"
    >
  </p>

</form>
```

这里没有任何特殊的东西。接下来我们再看看 `JavaScript。`

```js
const apiUrl = 'https://vuecookbook.netlify.com/.netlify/functions/product-name?name=';

const app = new Vue({
  el: '#app',
  data: {
    errors: [],
    name: ''
  },
  methods:{
    checkForm: function (e) {
      e.preventDefault();

      this.errors = [];

      if (this.name === '') {
        this.errors.push('Product name is required.');
      } else {
        fetch(apiUrl + encodeURIComponent(this.name))
        .then(async res => {
          if (res.status === 204) {
            alert('OK');
          } else if (res.status === 400) {
            let errorResponse = await res.json();
            this.errors.push(errorResponse.error);
          }
        });
      }
    }
  }
})
```

我们从一个运行在 `OpenWhisk` 的 `API` 的 `URL` 变量开始。现在注意 `checkForm`。在这个版本中，我们始终阻止了表单的提交 (当然，它也可以通过 `Vue` 在 `HTML` 中完成)。你可以看到一个基本的校验，即 `this.name` 是否为空，然后我们请求这个 `API`。如果名字是无效的，我们就添加一个错误。如果是有效的，我们就不做任何事 (只是一个 `alert`)，但是你可以引导用户去一个新页面，在 `URL` 中带上产品的名字，或者其它行为。

## 可编辑的 SVG 图标系统

### 基本的示例

创建一套 `SVG` 图标系统的方式有很多，但是有一种方法能够充分发挥 `Vue` 的能力，那就是把可编辑的内联图标创建为组件。这样做有好多好处：

图标易于实时修改

图标可以带动画

你可以使用标准的 `prop` 和默认值来将图标保持在一个典型的尺寸并随时按需改变它们

图标是内联的，所以不需要额外的 `HTTP` 请求

可以动态地使得图标可访问

首先，我们将为所有的图标创建一个文件夹，并将这些图标以一种标准化的方式命名以便获取它们：

```js
components/icons/IconBox.vue
components/icons/IconCalendar.vue
components/icons/IconEnvelope.vue
```

这里有一个示例的仓库，你可以看到全部的配置：https://github.com/sdras/vue-sample-svg-icons/。

我们将会创建一个基础图标 (`IconBase.vue`) 组件，并使用了一个插槽。

```js
<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 18 18"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title
      :id="iconName"
      lang="en"
    >{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>
```

你可以像这样使用这个基础图标，唯一可能要做的就是根据你图标的 `viewBox` 来更新其 `viewBox`。在基础图标里会有 `width、height、iconColor` 以及图标的名字等 `prop`，这样我们就可以通过 `prop` 对其动态更新。这个名字将会同时用在 `<title>` 的内容及其用于提供可访问性的 `id` 上。

我们的脚本是下面这样的，我们设了一些默认值，这样在没有特别设置的情况下图标渲染出来就是一致的：

```js
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
```

`currentColor` 会成为 `fill` 的默认值，于是图标就会继承周围文字的颜色了。我们也可以根据需求传递一个不一样的颜色的 `prop。`

我们可以这样使用它，通过 `IconWrite.vue` 将图标的路径包含于其中，作为其唯一的内容：

```js
<icon-base icon-name="write"><icon-write /></icon-base>
```

现在，如果我们想要创建更多种尺寸的图标，我们可以简单的这样做：

```js
<p>
  <!-- 你可以通过 prop 传递更小的 `width` 和 `height` -->
  <icon-base
    width="12"
    height="12"
    icon-name="write"
  ><icon-write /></icon-base>
  <!-- 或者你可以使用默认值，即 18 -->
  <icon-base icon-name="write"><icon-write /></icon-base>
  <!-- 或者让它更大一些 :) -->
  <icon-base
    width="30"
    height="30"
    icon-name="write"
  ><icon-write /></icon-base>
</p>
```

### 带动画的图标

当我们想要赋予它们动画，尤其是在一个交互动作的时候，在组件中控制图标是非常方便的。内联 `SVG` 对各种交互行为都有最高级的支持。这里有一个图标在点击之后产生动画的基本的示例：

```js
<template>
  <svg
    @click="startScissors"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
    aria-labelledby="scissors"
    role="presentation"
  >
    <title
      id="scissors"
      lang="en"
    >Scissors Animated Icon</title>
    <path
      id="bk"
      fill="#fff"
      d="M0 0h100v100H0z"/>
    <g ref="leftscissor">
      <path d="M..."/>
      ...
    </g>
    <g ref="rightscissor">
      <path d="M..."/>
      ...
    </g>
  </svg>
</template>
```

```js
import { TweenMax, Sine } from 'gsap'

export default {
  methods: {
    startScissors() {
      this.scissorAnim(this.$refs.rightscissor, 30)
      this.scissorAnim(this.$refs.leftscissor, -30)
    },
    scissorAnim(el, rot) {
      TweenMax.to(el, 0.25, {
        rotation: rot,
        repeat: 3,
        yoyo: true,
        svgOrigin: '50 45',
        ease: Sine.easeInOut
      })
    }
  }
}
```

我们通过 `ref` 将我们需要移动的路径做了分组，因为这把剪刀的两侧需要同时移动，所以我们会创建一个传入 `ref` 的可复用的函数。并使用 `GreenSock` 帮助我们完成动画并解决 `transform-origin` 的浏览器兼容性问题。

## 客户端存储

### 基本的示例

客户端存储是快速为一个应用进行性能优化的绝佳方法。通过把数据存储在浏览器中，用户不必每次都向服务器请求获取同一个信息。在你离线时，使用本地存储的数据而不是向远端服务器上请求数据就显得非常有用，甚至在线用户也可以从中获益。客户端存储可以通过这些技术来实现：`cookie、Local Storage` (更准确地说是`“Web Storage”`)`、IndexedDB` 和 `WebSQL` (这项技术已经被废弃了，你不应该在新项目中使用它)。

在这个 `cookbook` 的条目中，我们将专注于最简单的存储机制：`Local Storage。Local Storage` 使用键/值对来存储数据。它仅支持存储简单的值，但也可以通过 `JSON` 编解码来存储复杂的数据。总的来说，`Local Storage` 适合存储你希望进行持久化的较小数据集，比如用户偏好设置或表单数据。更大规模和更复杂的数据则适合存储在 `IndexedDB` 中。

让我们从一个表单的简单示例开始：

```js
<div id="app">
  My name is <input v-model="name">
</div>
```

这个示例中的表单字段绑定了一个叫 `name` 的值。下面是 `JavaScript` 代码：

```js
const app = new Vue({
  el: '#app',
  data: {
    name: ''
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    }
  }
});
```

请注意 `mounted` 和 `watch` 两个方法。我们使用 `mounted` 方法来从 `localStorage` 中加载数据。为了将数据写入，我们侦听 `name` 值的变化，并将数据实时写入。

将变化的值立即写入或许是不被推荐的。让我们来考虑一个略微进阶的示例，首先是升级后的表单。

```js
<div id="app">
  <p>
    My name is <input v-model="name">
    and I am <input v-model="age"> years old.
  </p>
  <p>
    <button @click="persist">Save</button>
  </p>
</div>
```

现在我们有了两个字段 (依然是绑定到一个 `Vue` 实例上)，但是多了一个可以运行 `persist` 方法的按钮。让我们来看 `JavaScript` 代码。

```js
const app = new Vue({
  el: '#app',
  data: {
    name: '',
    age: 0
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.age) {
      this.age = localStorage.age;
    }
  },
  methods: {
    persist() {
      localStorage.name = this.name;
      localStorage.age = this.age;
      console.log('now pretend I did more stuff...');
    }
  }
})
```

像之前一样，`mounted` 方法是用来加载持久化了的数据 (如果存在的话)。这一次，数据只会在点击按钮后才被持久化。我们也可以在数据被存储之前，对数据进行验证或转换。你也可以将日期一并存储进去来记录这些数据是何时被存储的。有了这些元数据，`mounted` 方法就可以通过逻辑判断来决定是否再次对数据进行存储。

### 处理复杂的数据

就像在前文中提到的那样，`Local Storage` 只适合用于存储简单的值。为了存储对象和数组这样更复杂的数据，你必须使用 `JSON` 来对数据进行序列化和反序列化。下面这个示例演示了对一个猫的数组进行持久化的操作 (这个数组类型不能更好了)。

```js
<div id="app">
  <h2>Cats</h2>
  <div v-for="(cat, n) in cats">
    <p>
      <span class="cat">{{ cat }}</span>
      <button @click="removeCat(n)">Remove</button>
    </p>
  </div>

  <p>
    <input v-model="newCat">
    <button @click="addCat">Add Cat</button>
  </p>
</div>
```

这个“`app`”的顶部有一个简单的列表 (还有一个可以移除一只猫的按钮)，底部有一个添加一只新猫的表单。现在我们来看 `JavaScript` 代码。

```js
const app = new Vue({
  el: '#app',
  data: {
    cats: [],
    newCat: null
  },
  mounted() {
    if (localStorage.getItem('cats')) {
      try {
        this.cats = JSON.parse(localStorage.getItem('cats'));
      } catch(e) {
        localStorage.removeItem('cats');
      }
    }
  },
  methods: {
    addCat() {
      // 确保他们输入了一些东西
      if (!this.newCat) {
        return;
      }

      this.cats.push(this.newCat);
      this.newCat = '';
      this.saveCats();
    },
    removeCat(x) {
      this.cats.splice(x, 1);
      this.saveCats();
    },
    saveCats() {
      const parsed = JSON.stringify(this.cats);
      localStorage.setItem('cats', parsed);
    }
  }
})
```

在这个应用中，我们转而调用 `Local Storage API` 而不再“直接”访问 `Local Storage`。这两种方法都是有效的，但是调用 `API` 往往是更值得推荐的方法。`mounted` 方法现在需要先获取数据，然后对 `JSON` 格式的数据进行解析。如果这里出现了任何错误，我们就认为数据已经损坏了并将它删除。(请记住，如果你的网页应用使用了客户端存储技术，用户可以随意访问并修改这些存储的数据。)

我们现在有三种方法可以对猫进行操作。`addCat` 和 `removeCat` 方法负责更新储存在 `this.cats` 中的“实时”`Vue` 数据。在此之后，它们通过 `saveCats` 方法来序列化和持久化这些数据。

## 在 VS Code 中调试

每个应用，不论大小，都需要理解程序是如何运行失败的。在本案例中，我们会探索一些 `VS Code` 用户在浏览器中调试应用的工作流程。

这个案例展示了如何在 `VS Code` 中调试浏览器中运行的通过 `Vue CLI` 生成的 `Vue.js` 应用程序。

[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

### 在浏览器中展示源代码

在可以从 `VS Code` 调试你的 `Vue` 组件之前，你需要更新 `webpack` 配置以构建 `source map`。做了这件事之后，我们的调试器就有机会将一个被压缩的文件中的代码对应回其源文件相应的位置。这会确保你可以在一个应用中调试，即便你的资源已经被 `webpack` 优化过了也没关系。

打开 `config/index.js` 并找到 `devtool property`。将其更新为：

如果你使用的是 `Vue CLI 2`，请设置并更新 `config/index.js` 内的 `devtool property`：

```js
devtool: 'source-map',
```

如果你使用的是 `Vue CLI 3`，请设置并更新 `vue.config.js` 内的 `devtool property`：

```js
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  }
}
```




