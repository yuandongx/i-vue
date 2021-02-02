import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./libs/router";
import { Layout,
         Menu, } from "ant-design-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "default-passive-events";

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
  NProgress.start();
  NProgress.inc();
  next();
});
//当路由进入后：关闭进度条
router.afterEach(() => {
  NProgress.done();
});

const app = createApp(App)
            .use(router)
            .use(Layout)
            .use(Menu)
axios.defaults.withCredentials = false;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.baseURL = "http://127.0.0.1:8888";
app.config.globalProperties.http =  axios;
app.mount("#app");
