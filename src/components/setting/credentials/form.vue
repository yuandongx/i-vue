<template>
    <a-modal :visible="showForm" title="添加访问凭证" okText="确定" cancelText="取消">
        <!-- {{ showForm }} -->
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign="right" :rules="rules">
            <a-form-item label="标识" name="name"><a-input v-model:value="form.name"/></a-form-item>
            <a-form-item label="用户名" name="username"><a-input v-model:value="form.username"/></a-form-item>
            <a-form-item label="密码" name="password"><a-input v-model:value="form.password"/></a-form-item>
            <a-form-item label="特权方法" name="become_method">
                <a-select
                placeholder="可选"
                v-model:value="form.become_method"
                show-search>
                <template #dropdownRender="{ menuNode: menu }">
                    <v-nodes :vnodes="menu" />
                    <a-divider style="margin: 4px 0;" />
                    <div
                        style="padding: 4px 8px; cursor: pointer;"
                        @mousedown="e => e.preventDefault()"
                        @click="addItem">
                        <plus-outlined /> 新加主机组
                        <a-modal 
                            v-model:visible="showNewMethodModal"
                            @ok="handleNewOk"
                            okText="确定"
                            cancelText="取消"
                            @cancel="handleNewCancle"
                            title="新加主机组">
                            <a-input v-model:value="new_become_method" placeholder="新主机组名"></a-input>
                        </a-modal>
                    </div>
                </template>
                <a-select-option v-for="b in becomeMethods" :key="b" >{{b}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="特权用户" name="become_user"><a-input v-model:value="form.become_user"/></a-form-item>
            <a-form-item label="特权密码" name="become_password"><a-input v-model:value="form.become_password"/></a-form-item>
            <a-form-item label="备注" name="descroption"><a-input-text v-model:value="form.descroption"/></a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
import { Form, Modal, Input, Select, Divider} from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue"
export default {
    props: ["showForm", "becomeMethods"],
    components:{
        [Input.name]: Input,
        [Modal.name]: Modal,
        [Form.name]: Form,
        [Select.name]: Select,
        [Divider.name]: Divider,
        "a-select-option": Select.Option,
        "a-form-item": Form.Item,
        "a-input-text": Input.TextArea,
        PlusOutlined,
        VNodes: (_, { attrs }) => {
        return attrs.vnodes;
        },
    },
    data(){
        return{
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
            showNewMethodModal: false,
            new_become_method: "",
            form:{
                name: "",
                username: "",
                password: "",
                become_method: "",
                become_user: "",
                become_password: "",
                descroption: "",
            },
            rules: {
                name: [{required: true, message: "请输入标识名。", trigger: "blur"},
                       {max: 255, min:1, message: "标识名长度范围为：1 ~ 255。"}],
                username: [{required: true, message: "请输入凭证的用户名。", trigger: "blur"}],
                password: [{required: true, message: "请输入与凭证用户名对应的密码。", trigger: "blur"}],
                become_user: [{message: "请输入与特权方法对应的密码。", trigger: "blur",
                                  validator: function(_, value){
                                      if(this.become_method !== "" && value === ""){
                                          Promise.reject("请输入特权密码。");
                                      } else{
                                          Promise.resolve();
                                      }}}],
                become_password: [{message: "请输入与特权方法对应的密码。", trigger: "blur",
                                  validator: function(_, value){
                                      if(this.become_method !== "" && value === ""){
                                          Promise.reject("请输入特权密码。");
                                      }else{
                                          Promise.resolve();
                                      }}}],
                descroption: [{max: 512, min: 0, message: "描述信息长度不应该超过 512"}]
            },
        }
    },
    methods:{
        onOk: function(){},
        onCancel: function(){},
        addItem: function(){},
        handleNewOk: function(){},
        handleNewCancle: function(){},
    }
}
</script>