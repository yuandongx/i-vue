import { createRouter, createWebHistory } from "vue-router";
import Items from "./menu";
import { hasAuthen } from "./cookies";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 如果是Menu 发生变化，新增路由应该在中Menu中添加
// const routes = Items.map(item => ({
//   path: item.path,
//   name: item.name,
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () =>
//     import("../components"+item.path+"/index.vue")
// }));

const windows = Items.map(item1 => {
  if (item1.children === undefined || item1.children.length === 0){
    if (item1.name !== undefined && item1.path !== undefined){
      return {
        path: item1.path,
        name: item1.name,
        components: {center: () => import("../components"+item1.path+"/index.vue")}
      }
    }
  } else if (item1.children !== undefined && item1.children.length > 0 && item1.path !== undefined && item1.name != undefined){
    return{
      path: item1.path,
      name: item1.name,
      components: {center: () => import("../components"+item1.path+"/index.vue")},
      children: item1.children.map(item2 => {
        // 二级菜单
        if (item2.children === undefined || item2.children.length === 0){
          if (item2.name !== undefined && item2.path !== undefined){
            return {
              path: item2.name,
              name: item2.name,
              component: () => import("../components"+item2.path+"/index.vue")
            }
          }
        } else if (item2.children !== undefined && item2.children.length > 0 && item2.path !== undefined && item2.name !== undefined){
          return {
              path: item2.name,
              name: item2.name,
              component: () => import("../components"+item2.path+"/index.vue"),
              children: item2.children.map(item3 => {
                // 三级菜单
                if (item3.name !== undefined && item3.path !== undefined){
                  return {
                    path: item3.name,
                    name: item3.name,
                    component: () => import("../components"+item3.path+"/index.vue")
                  }
                }
              })
          }
        }
      }),
    }
  }

});
// routes.push({
//   name: "ssh",
//   path: "/ssh/:id",
//   components: {ssh: () => import("../components/ssh/index.vue")}
// });
const routes = [{
  name: "ssh",
  path: "/ssh/:id",
  props: true,
  components: {ssh: () => import("../components/ssh/index.vue")}
},
{
  name: "login",
  path: "/login",
  components: {login: () => import("../login/index.vue")},
  props: {login: route => ({next: route.query.next})} // 命名视图要有自己的props配置（login对应的配置）
},
{
  name: "windows",
  path: "/",
  components: {windows: () => import("../window/index.vue")},
  children: windows,
}]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
});

//当路由进入前
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  // console.log(to.fullPath);
  // console.log(to.query);
  NProgress.start();
  NProgress.inc();
  if (!hasAuthen() && !to.fullPath.startsWith("/login")){
    next({path: "/login", query: {next: to.fullPath}});
  } else {
    next();
  }
});
//当路由进入后：关闭进度条
router.afterEach(() => {
  NProgress.done();
});
export default router;
