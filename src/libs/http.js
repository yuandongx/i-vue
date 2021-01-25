import axios from "axios";

const httpRequest =  axios.create({
    baseURL: "http://127.0.0.1:8888/api/",
    responseType: "json",
    withCredentials: true,
    timeout: 60000,
});

export default httpRequest;