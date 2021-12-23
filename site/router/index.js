import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/",
        name: "home-start",
        component: () => import(/*快速上手*/ "../docs/start.md")
      },
      {
        path: "/CHANGELOG",
        name: "CHANGELOG",
        component: () => import(/*更新日志*/ "../../CHANGELOG.md")
      },
      {
        path: "/vueapi2x",
        name: "vueapi2x",
        component: () => import(/*vueapi2x*/ "../docs/vueapi2x.md")
      },
      {
        path: "/cookbook",
        name: "cookbook",
        component: () => import(/*cookbook*/ "../docs/cookbook.md")
      },
      {
        path: "/vuecli",
        name: "vuecli",
        component: () => import(/*vuecli*/ "../docs/vuecli.md")
      },
      {
        path: "/vuex-module-decorators",
        name: "vuex-module-decorators",
        component: () =>
          import(/*vuex-module-decorators*/ "../docs/vuex-module-decorators.md")
      },
      {
        path: "/vue-property-decorator",
        name: "vue-property-decorator",
        component: () =>
          import(/*vue-property-decorator*/ "../docs/vue-property-decorator.md")
      },
      {
        path: "/javascript-regular-expressions-mini-book",
        name: "javascript-regular-expressions-mini-book",
        component: () =>
          import(
            /*javascript-regular-expressions-mini-book*/ "../docs/javascript-regular-expressions-mini-book.md"
          )
      },
      {
        path: "/vuex",
        name: "vuex",
        component: () => import(/*vuex*/ "../docs/vuex.md")
      },
      {
        path: "/UEditor-Docs",
        name: "UEditor-Docs",
        component: () => import(/*vuecli*/ "../docs/UEditor-Docs.md")
      },
      {
        path: "/VSCode-extension-recommended",
        name: "VSCode-extension-recommended",
        component: () =>
          import(
            /*VSCode-extension-recommended*/ "../docs/VSCode-extension-recommended.md"
          )
      },
      {
        path: "/ECMAScript-introduction-to-6",
        name: "ECMAScript-introduction-to-6",
        component: () =>
          import(
            /*ECMAScript-introduction-to-6*/ "../views/ECMAScript-introduction-to-6.vue"
          ),
        children: [
          {
            path: "/ECMAScript-introduction-to-6",
            name: "ECMAScript-introduction-to-6-md",
            component: () =>
              import(
                /*ECMAScript-introduction-to-6-md*/ "../docs/ECMAScript-introduction-to-6.md"
              )
          },
          {
            path: "/let-const",
            name: "let-const",
            component: () => import(/*let-const*/ "../docs/es6/let-const.md")
          }
        ]
      },
      {
        path: "/component/button",
        name: "component-button",
        component: () => import("../../src/button/index.md")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.NODE_ENV !== "production" ? "/" : "/",
  routes
});

export default router;
