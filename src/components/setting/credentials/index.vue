<template>
  <a-row>
    <a-col :span="2">
      <a-button
        type="link"
        @click="add"
      >
        添加访问凭证
      </a-button>
    </a-col>
    <a-col :span="4">
      <input-serch
        placeholder="输入信息以查找"
        enter-button="查找"
      />
    </a-col>
  </a-row>
  <a-divider />
  <table-dislpay
    @update="onUpdate"
    ref="display"
  />
  <add-form
    ref="addForm"
    @refresh="refresh"
  />
</template>
<script>
import {Button, Input, Row, Col, Divider} from "ant-design-vue";
import table from "./table.vue";
import addForm from "./form.vue";
import { provide, ref } from "vue";
export default {
  components:{
    [Row.name]: Row,
    [Col.name]: Col,
    [Divider.name]: Divider,
    [Button.name]: Button,
    "table-dislpay": table,
    "input-serch": Input.Search,
    "add-form": addForm,
  },
  data() {
    return {
      showAdd: false,
    };
  },
  methods:{
    add(){
      this.formVisibel = true;
    },
    onUpdate(param={}){
      this.$refs.addForm.update(param);
      this.formVisibel = true;
    },
    refresh(){
      this.$refs.display.fetch();
    }
  },
  setup(){
    const formVisibel = ref(false);
    provide("formVisibel", formVisibel)
    return {
      formVisibel
    }
  }
}
</script>
