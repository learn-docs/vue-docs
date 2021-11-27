# VUE-DOCS

����ʾ����ʽ��

````markdown
:::snippet ͨ�� `v-button` ��ǩ��ʼ����ť��

```html
<template>
  <div>
    <v-button>Default</v-button>
  </div>
</template>
```

:::
````

����ʾ����Ⱦ��

![�������ʾ��](site/images/vue-snippet-02.png)

## �ṹ����

1. �ļ��ṹ����

```javascript
����site          //ʾ����վĿ¼
�� ����components  //ʾ����վ���
�� ����router      //·������
�� �� ����index.js  //·�������ļ�
�� ����views       //ʾ��ҳ��
�� �� ����Home.vue  //ʾ����վ��ҳ
�� ����App.vue     //��Ŀ���
�� ����main.js     //�����ļ�
����src           //Դ��Ŀ¼
```

2. ��Ŀ¼���� `vue.config.js` ����

```javascript
module.exports = {
  pages: {
    index: {
      entry: "site/main.js",
    },
  },
};
```

3. ��ص�������·�����ý��е�����`Home.vue` ҳ�����

```vue
<template>
  <h1>Home</h1>
</template>

<script>
export default {
  name: "Home",
};
</script>
```

4. ҳ�����

![ҳ�����](site/images/vue-ui-10.png)

## �������

1. `Button` �������

```html
<template>
  <button v-bind="$attrs" class="v-button" type="button" @click="handleClick">
    <span class="v-buttov--text">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script>
  export default {
    name: "VButton",
    props: {
      text: String,
    },
    methods: {
      handleClick(event) {
        this.$emit("click", event);
      },
    },
  };
</script>

<style lang="scss">
  .v-button {
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid #41a259;
    background-color: #41a259;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    transition: all 0.3s;
    user-select: none;
    height: 32px;
    min-width: 88px;
    padding: 0 16px;
    font-size: 14px;
    border-radius: 4px;
    color: #ffffff;
    outline: 0;
    font-family: inherit;
    cursor: pointer;

    &:active,
    &:focus {
      outline: 0;
    }
  }
</style>
```

2. ��װ���� `src/button/index.js`

```javascript
import Button from "./src/button";

Button.install = (Vue) => {
  Vue.component(Button.name, Button);
};

export default Button;
```

3. ������ɰ�װ `src/index.js`

```javascript
import Button from "./button/index.js";

const components = [Button];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.use(component);
  });
};

export default {
  install,
};
```

4. ����ļ����� `site/main.js`

```javascript
import VueUIDocs from "../src/index";
Vue.use(VueUIDocs);
```

# vue-docs
vue-docs
































































































































































>>>>>>> .theirs
