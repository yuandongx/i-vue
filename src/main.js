import { createApp } from "vue";
import axios from "./libs/http";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./libs/router";
import { Layout,
         Menu, } from "ant-design-vue";
import store from "./store";


const app = createApp(App)
            .use(router)
            .use(Layout)
            .use(Menu)
            .use(store);
app.config.globalProperties.http =  axios;
app.mount("#app");
