<template>
    <div>
      <a-row>
        <a-col :span="2">
          <a-button type="link" @click="()=>(addHostVisiable=true)">新建主机</a-button>
          <add-new-host />
        </a-col>
        <a-col :span="2">
          <a-button type="link">批量导入主机</a-button>
        </a-col>
        <a-col :span="2">
          <a-button type="link">批量删除主机</a-button>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <display />
    </div>
</template>
<script>
import {provide, ref} from "vue"
import display from "./display.vue";
import add_new_host from "./add"
export default {
  components:{
    "display": display,
    "add-new-host": add_new_host
  },
  setup(){
    const addHostVisiable = ref(false);
    provide("addHostVisiable", addHostVisiable);
    return {
      addHostVisiable
    }
  }
}
</script>