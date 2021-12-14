import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { en, zh } from "../lang/index";
// 引入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 引入element-ui样式

import ElementLocale from "element-ui/lib/locale";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh",
  messages: {
    zh: zh,
    en: en
  }
});
ElementLocale.i18n((key, value) => i18n.t(key, value));

Vue.use(ElementUI, { size: "small", zIndex: 3000 });

Vue.config.productionTip = false;

import "highlight.js/styles/color-brewer.css";

import VcSnippet from "./components/snippet";
Vue.component("vc-snippet", VcSnippet);

import VueUIDocs from "../src/index";
Vue.use(VueUIDocs);

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
