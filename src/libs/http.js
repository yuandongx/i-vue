import axios from "axios";

axios.defaults.withCredentials = true; // 必须为true，不然读不到cookie
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.baseURL = "http://127.0.0.1:8888";
axios.interceptors.request.use(config=>{
    return config;
}, error => {
    return Promise.reject(error);
});

export default axios;