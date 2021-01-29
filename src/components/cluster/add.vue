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
            ref="ruleForm"
            :rules="rules"
            name="add-new-host"
            @finish="addFinsh"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            @finishFailed="addFinishFailed">
            <a-form-item name="hostname" label="主机名" hasFeedback>
              <a-input v-model:value="form.hostname" autocomplete="off"></a-input>
            </a-form-item>
            <a-form-item name="hostgroup" label="主机组" hasFeedback>
            <a-select
              placeholder="请选择主机组"
              v-model:value="form.hostgroup"
              show-search>
              <template #dropdownRender="{ menuNode: menu }">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0;" />
                <div
                    style="padding: 4px 8px; cursor: pointer;"
                    @mousedown="e => e.preventDefault()"
                    @click="addItem"
                >
                    <plus-outlined /> 新加主机组
                    <a-modal 
                        v-model:visible="newGroupModal"
                        @ok="handleNewGroupOk"
                        okText="确定"
                        cancelText="取消"
                        @cancel="handleNewGroupCancle"
                        title="新加主机组">
                        <a-input v-model:value="new_group" placeholder="新主机组名"></a-input>
                    </a-modal>
                </div>
              </template>
              <a-select-option v-for="g in groups" :key="g" >{{g}}</a-select-option>
            </a-select>
            </a-form-item>
            <a-form-item name="hostip" label="主机地址" required hasFeedback>
            <a-input v-model:value="form.hostip" autocomplete="off"></a-input>
            </a-form-item>
            <a-form-item name="port" label="端口" hasFeedback>
                <a-input-number
                  v-model:value="form.port"
                  autocomplete="off"/>
            </a-form-item>
            <a-form-item name="credential" label="访问凭证" hasFeedback>
            <a-select
              placeholder="请选择访问凭证"
              v-model:value="form.credential"
              show-search>
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
import {PlusOutlined } from "@ant-design/icons-vue";
import { message, Modal, Form, Select, Input, InputNumber, Divider} from "ant-design-vue";

const validatIp = (_, value) => {
    const tmp = value.split(".").filter(item => Number(item) != Number.NaN && Number(item) < 256 && Number(item) > 0);
    if (tmp.length != 4){
        return Promise.reject("IP 地址无效！");
    }
    return Promise.resolve();  
}
export default {
    components:{
        [Divider.name]: Divider,
        [Modal.name]: Modal,
        [Form.name]: Form,
        [Form.Item.name]: Form.Item,
        [Select.name]: Select,
        "a-select-option": Select.Option,
        [Input.name]: Input,
        "a-textarea": Input.TextArea,
       [InputNumber.name]: InputNumber,
        PlusOutlined,
        VNodes: (_, { attrs }) => {
        return attrs.vnodes;
        },
    },
    data() {
        return {
            new_group: "",
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            credentials: [],
            newGroupModal: false,
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
                hostname:[{required: true, message: '请输入主机名', trigger: 'blur' },
                          {min: 1, max: 64, message: '名称长度应从1到64', trigger: 'blur'}],
                hostgroup:[{required:true, message: "请选择主机组", trigger: "blur"},
                            {min:1, max: 64, message: "组名长度应从1到64", trigger: "blur"}],
                hostip: [{required: true, message: "请输入有效的主机IP地址", trigger: "blur", validator: validatIp}],
                port: [{required: true, type: "number", message: "请输入端口", trigger: "blur"},
                       {type: "number", min: 1, max: 65535, message: "端口应从1到65535", trigger: "blur"}],
                credential: [{required: true, message: "请选择访问凭证", trigger: "blur"}],
                description: [{max: 512, message: "描述信息长度应小于512个字符", trigger:"blur"}],
            },
        }
    },
    setup(){
        const addHostVisiable = inject("addHostVisiable", false);
        return{addHostVisiable};
    },
    mounted(){
        this.fetchCred();
        this.fetchGroups();
    },
    methods: {
        handleAddOk: async function(){
            this.$refs.ruleForm.validate().then(()=>{
                // this.http.post("/api/host/add", this.form).then(function(response){
                //     message.success(response.data);
                // }).catch(function(error){
                //     message.error(error);
                // });
                this.update();
            });
        },
        update: async function(){
            // 需要等待上传结果， 成功之后更新表
            try {
                const response = await this.http.post("/api/host/add", this.form)
                message.success(response.data);
                this.$emit("redisplay");
                this.addHostVisiable = false;
                this.$refs.ruleForm.resetFields();
            } catch(error){
                message.error(error);
            }
        },
        handleAddCancle: function(){
        this.addHostVisiable = false;
        },
        handleNewGroupOk: function(){
            this.newGroupModal = false;
            this.form.hostgroup = this.new_group;
        },
        handleNewGroupCancle: function(){
            this.newGroupModal = false;
        },
        addFinsh: function(){},
        addFinishFailed: function(){},
        fetchCred: function(){
            this.http.get("/api/setting/credentials").then(({data})=>{
                this.credentials = data.map((item) => (item.name));
            })
        },
        fetchGroups: function(){
            this.http.get("/api/host/groups").then(({data})=>{
                this.groups = data;
            })
        },
        addItem() {
          this.newGroupModal = true;
        },
    }
}
</script>