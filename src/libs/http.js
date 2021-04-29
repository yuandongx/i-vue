import axios from "axios";

axios.defaults.withCredentials = true; // 必须为true，不然读不到cookie
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

axios.defaults.baseURL = "http://127.0.0.1:8888";

export default axios;