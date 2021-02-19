const redis = require("redis");
const client = redis.createClient({host: "127.0.0.1", port: "6379"});
const publish = (channle, msg) => {
    client.publish(channle,  msg)
}
const subscribe = (channle) => {
    client.subscribe(channle);

}

export default {client, publish, subscribe}