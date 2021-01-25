<template>
    <a-modal
        :visible="addHostVisiable"
        title="添加新主机"
        @ok="handleAddOk"
        destroyOnClose
        okText="确定"
        cancelText="取消"
        @cancel="handleAddCancle">
        <a-form
            :model="form"
            name="add-new-host"
            @finish="addFinsh"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            @finishFailed="addFinishFailed">
            <a-form-item name="hostname" required label="主机名" hasFeedback>
            <a-input v-model:value="form.hostname" autocomplete="off"></a-input>
            </a-form-item>
            <a-form-item name="hostgroup" label="主机组">
            <a-input v-model:value="form.hostgroup" autocomplete="off"></a-input>
            </a-form-item>
            <a-form-item name="hostip" label="主机地址" required hasFeedback>
            <a-input v-model:value="form.hostip" autocomplete="off"></a-input>
            </a-form-item>
            <a-form-item name="port" label="端口" required>
            <a-input-number  v-model:value="form.port" autocomplete="off"></a-input-number>
            </a-form-item>
            <a-form-item name="credential" label="描述信息">
            <a-textarea v-model:value="form.credential" autocomplete="off"></a-textarea>
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
    data() {
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            form: {
                hostname: "",
                hostgroup: "",
                hostip: "",
                port: 22,
                credential: "",
                description: ""
            }
        }
    },
    setup(){
        const addHostVisiable = inject("addHostVisiable", false);
        return{addHostVisiable}
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
        addFinishFailed: function(){}
    }
}
</script>