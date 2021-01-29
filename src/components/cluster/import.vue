<template>
    <a-modal
     :visible="importVisible"
     okText="确定"
     cancelText="取消"
     @ok="onOk"
     @cancel="onCancel"
     title="批量导入">
    <a-tag :color="levelColor">
      <template #icon>
         <CheckCircleOutlined v-if="levelColor == 'success'"/>
         <ClockCircleOutlined v-else-if="levelColor == 'error'"/>
         <ExclamationCircleFilled v-else/>
      </template>
      {{ msg }}
    </a-tag>
    <br>
    <div>
        <a href="/resource/template.xlsx">下载模板</a>
         <a-upload
            :customRequest="upload"
            @change="handleChange"
            :multiple="false"
            v-model:fileList="fileList">
            <a-button type="link">上传文件</a-button>
         </a-upload>
    </div>
    </a-modal>
</template>
<script>
import { ExclamationCircleFilled, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons-vue";
import { Modal, Button, Upload, Tag, message } from "ant-design-vue";
import { inject } from "vue";

export default {
    setup(){
        let importVisible = inject("importVisible", false);
        return {importVisible};
    },
    data(){
        return{
            fileList: [],
            msg: "请先下载 Excel 模板文件，并填写表格字段对应，然后上传！",
            levelColor: "warning",
            file_alias: "",
        };
    },
    components: {
        ExclamationCircleFilled,
        ClockCircleOutlined,
        CheckCircleOutlined,
        [Button.name]: Button,
        [Modal.name]: Modal,
        [Upload.name]: Upload,
        [Tag.name]: Tag,
    },
    methods: {
        handleChange(info) {
            let fileList = [...info.fileList];
            // 1. Limit the number of uploaded files
            //    Only to show two recent uploaded files, and old ones will be replaced by the new
            fileList = fileList.slice(-1);

            // 2. read from response and show file link
            fileList = fileList.map(file => {
                if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
                }
                return file;
            });

            this.fileList = fileList;
        },
        onOk: function(){
            console.log("okON");
            // let file = this.file_alias;
            // let post = this.http.post;
            const commit = this.commit;
            let info = {
                        autoFocusButton: "ok",
                        cancelText: "取消",
                        closable: false,
                        centered: true,
                        content: "确定提交？",
                        okText: "确定",
                        onOk: commit,
                        onCancel: function(){
                            Modal.destroyAll();
                        }
                    };
            if (this.fileList.length > 0 && this.levelColor == "success") {
                Modal.confirm(info);
            }
            this.importVisible = false;
            this.fileList =[];
            this.msg = "请先下载 Excel 模板文件，并填写表格字段对应，然后上传！";
        },
        commit: async function(){
            let data = new FormData();
            data.append("file_alias", this.file_alias);
            data.append("commit", "yes");
            // 需要等待上传结果， 成功之后更新表
            try{
                const result = await this.http.post("/api/host/upload", data);
                message.success(result.data);
                this.$emit("redisplay");
            }catch(error){
                message.error(error);
            }
        },
        onCancel: function(){
            this.importVisible = false;
            this.fileList =[];
            this.msg = "请先下载 Excel 模板文件，并填写表格字段对应，然后上传！";
        },
        upload: function(data){
            let form = new FormData();
            form.append("file", data.file);
            form.append("commit", "no");
            this.http.post("/api/host/upload", form).then((result) => {
                // console.log(result);
                let {ok, err, skip, alias} = result.data;
                this.file_alias = alias;
                // console.log(alias);
                if (err > 0 && ok == 0){
                    this.msg = "上传解析结果：共 " + err + " 行错误，" + skip + " 行跳过, 0 行成功！";
                    this.levelColor = "error";
                } else if (err == 0 && skip == 0 && ok > 0){
                    this.msg = "上传解析结果：共 " + ok + " 行成功，" + skip + " 行跳过, 0 行错误！";
                    this.levelColor = "success";
                } else {
                    this.msg = "上传解析结果：共 " + ok + " 行成功，" + skip + " 行跳过," + err + " 行错误！";
                    this.levelColor = "warning";
                }
                data.onSuccess(result, data.file);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>