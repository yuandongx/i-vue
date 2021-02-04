<template>
    <a-table :columns="columns" :loading="loading" :dataSource="data" :rowKey="recoder => recoder.id">
        <template #operation="{record}">
            <span>
                <a href="#" @click="handleModify(record)">修改</a>
                <a-divider type="vertical"></a-divider>
                <a href="#" @click="handleDelete(record)">删除</a>
            </span>
        </template>
    </a-table>
</template>
<script>
import {Table, Divider, Button} from "ant-design-vue";
import { provide, reactive} from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } =  createNamespacedHelpers("setting");
const columns = [
    {
        title: "标识",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "用户名",
        dataIndex: "username",
        key: "username",
    },
    {
        title: "描述",
        dataIndex: "descroption",
        key: "descroption",
    },
    {
        title: "创建者",
        dataIndex: "creator",
        key: "creator",
    },
    {
        title: "创建时间",
        dataIndex: "create_time",
        key: "creator",
    },
    {
        title: "操作",
        dataIndex: "opreation",
        key: "opreation",
        slots: { customRender: 'operation' },
    },
];
export default {
    components:{
        [Button.name]: Button,
        [Table.name]: Table,
        "a-divider": Divider,
    },
    mounted(){
        this.fetch();
    },
    data(){
        return {
            columns,
            data:[],
            loading: false,
        }
    },
    methods:{
        fetch(){
            this.loading = true;
            this.http.get("/api/setting/credentials").then(({data})=>{
                this.data = data;
                //this.$store.setting.commit("saveCredent", data);
                this.saveCredent(data);
            }).finally(()=>{
                this.loading = false;
            });
        },
        handleModify(recoder){
            console.log(recoder);
        },
        handleDelete(recoder){
            console.log(recoder);
        },
        ...mapMutations(["saveCredent", "saveCredent"]),
    }, 
    setup(){
        const become_methods = reactive(["sudo"]);
        provide(become_methods)
        return {become_methods};
    }
}
</script>