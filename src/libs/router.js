import { createRouter, createWebHistory } from "vue-router";
import Items from "./menu";
import { hasAuthen } from "./cookies";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

function getMenuItems(items) {
  const subRotes = [];
  for(const item of items) {
    const router = {
      name: item.name,
      path: item.path,
      // components: {center: () => import("../components"+item.path+"/index.vue")}
      component: () => import(`../components${item.path}/index.vue`)
    };
    // console.log(`../components${item.path}/index.vue`);
    if (item.children !== undefined && item.children.length > 0) {
      router.children = getMenuItems(item.children);
    }
    subRotes.push(router);
  }
  return subRotes;
}

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
  name: "views",
  path: "/",
  components: {views: () => import("../views/index.vue")},
  children: getMenuItems(Items),
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
  if (hasAuthen() && !to.fullPath.startsWith("/login")){
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
