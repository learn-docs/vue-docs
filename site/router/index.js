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
        path: "/changelog",
        name: "changelog",
        component: () => import(/*更新日志*/ "../../changelog.md")
      },
      {
        path: "/vueapi2x",
        name: "start",
        component: () => import(/*vueapi2x*/ "../docs/vueapi2x.md")
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
  base: process.env.NODE_ENV !== "production" ? "/" : "/vue-ui-docs",
  routes
});

export default router;
