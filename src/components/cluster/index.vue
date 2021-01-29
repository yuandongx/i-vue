<template>
    <div>
      <a-row>
        <a-col :span="2">
          <a-button type="link" @click="()=>(addHostVisiable=true)">新建主机</a-button>
          <add-new-host @redisplay="redisplay" />
        </a-col>
        <a-col :span="2">
          <a-button type="link" @click="showImportModal">批量导入主机</a-button>
        </a-col>
        <a-col :span="2">
          <a-button type="link">批量删除主机</a-button>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <display ref="refresh"/>
      <import-modal  @redisplay="redisplay"/>
    </div>
</template>
<script>
import { Button, Col, Divider, Row } from "ant-design-vue";
import {provide, ref} from "vue"
import display from "./display.vue";
import add_new_host from "./add";
import import_modal from "./import";
export default {
  components:{
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Divider.name]: Divider,
    "display": display,
    "add-new-host": add_new_host,
    "import-modal": import_modal,
  },
  setup(){
    const addHostVisiable = ref(false);
    let importVisible = ref(false);
    provide("addHostVisiable", addHostVisiable);
    provide("importVisible", importVisible);
    return {
      addHostVisiable,
      importVisible,
    }
  },
  methods: {
    showImportModal: function(){
      this.importVisible = true; 
    },
    redisplay: function(){
      console.log("redisplay is called.");
      this.$refs.refresh.fetch();
    },
  }
}
</script>