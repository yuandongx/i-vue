<template>
    <a-modal
        :visible="addHostVisiable"
        title="添加新主机"
        @ok="handleAddOk"
        destroyOnClose
        okText="确定"
        cancelText="取消"
        :ok-button-props="disableOk"
        @cancel="handleAddCancle">
        <a-form
            :model="form"
            name="add-new-host"
            :rules="rules"
            @finish="addFinsh"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            @finishFailed="addFinishFailed">
            <a-form-item name="hostname" required label="主机名" hasFeedback>
            <a-input v-model:value="form.hostname" autocomplete="off"></a-input>
            </a-form-item>
            <a-form-item name="hostgroup" label="主机组">
            <a-select
              placeholder="请选择主机组"
              v-model:value="form.hostgroup"
              show-search>
              <a-select-option v-for="g in groups" :key="g" >{{g}}</a-select-option>
            </a-select>
            </a-form-item>
            <a-form-item name="hostip" label="主机地址" required hasFeedback>
            <a-input v-model:value="form.hostip" autocomplete="off"></a-input>
            </a-form-item>
            <a-form-item name="port" label="端口" >
                <a-input-number
                  v-model:value="form.port"
                  autocomplete="off"/>
            </a-form-item>
            <a-form-item name="credential" label="访问凭证">
            <a-select
              placeholder="请选择访问凭证"
              v-model:value="form.credential"
              show-search
              >
              <a-select-option v-for="item in credentials" :key="item" >{{item}}</a-select-option>
            </a-select>
            </a-form-item>
            <a-form-item name="description" label="描述信息">
            <a-textarea v-model:value="form.description" autocomplete="off"></a-textarea>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
import {inject} from "vue";
export default {
    // computed:{
    //     [Select.name]: Select,
    // },
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            disableOk: {disabled: true},
            credentials: [],
            groups: [],
            form: {
                hostname: "",
                hostgroup: "",
                hostip: "",
                port: 22,
                credential: "",
                description: ""
            },
            rules: {
            },
        }
    },
    setup(){
        const addHostVisiable = inject("addHostVisiable", false);
        return{addHostVisiable}
    },
    mounted(){
        this.fetchCred();
        this.fetchGroups();
    },
    methods: {
        handleAddOk: function(){
        console.log(this.form);
        this.http.post("/api/host/add", this.form).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.error(error);
        });
        this.addHostVisiable = false;
        },
        handleAddCancle: function(){
        this.addHostVisiable = false;
        },
        addFinsh: function(){},
        addFinishFailed: function(){},
        fetchCred: function(){
            this.http.get("/api/setting/credentials").then(({data})=>{
                this.credentials = data.map((item) => (item.name))
            })
        },
        fetchGroups: function(){
            this.http.get("/api/host/groups").then(({data})=>{
                this.groups = data;
            })
        },
    }
}
</script>