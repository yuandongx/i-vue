import { createRouter, createWebHistory } from "vue-router";
import Items from "./menu";
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

export default router;
