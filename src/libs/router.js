import { createRouter, createWebHistory } from "vue-router";
import Items from "./menu";
// 如果是Menu 发生变化，新增路由应该在中Menu中添加
const routes = Items.map(item => ({
  path: item.path,
  name: item.name,
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import("../components/"+item.name+"/index.vue")
}));


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
