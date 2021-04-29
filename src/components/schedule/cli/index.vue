<template>
  <a-button
    type="dashed"
    @click="onSelectHosts"
  >
    <PlusOutlined />
    选择目标主机
  </a-button>
  <a-tag
    v-for="host in selected"
    :key="host.id"
    @close="onCloseTag(host)"
    :closable="true"
  >
    {{ host.hostname }}（{{ host.hostip }}）
  </a-tag>
  <a-modal
    :visible="showSelectModal"
    title="请选择目标主机"
    @ok="onOk"
    @cancel="onCancel"
  >
    <b-display ref="display" />
  </a-modal>
</template>
<script>
import display from "./hosts.vue";
import { Button, Tag, Modal } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";

export default {
    components: {
        [Button.name]: Button,
        [Tag.name]: Tag,
        [Modal.name]:  Modal,
        PlusOutlined,
        "b-display": display,
    },
    data(){
        return {
            selected: [],
            showSelectModal: false,
        }
    },
    methods: {
        onSelectHosts: function(){
            this.showSelectModal = true;
        },
        onOk: function(){
            this.selected = this.$refs.display.selectedHost();
            this.showSelectModal = false;
        },
        onCancel: function(){
            this.showSelectModal = false;
            this.selected = [];
        },
        onCloseTag: function(tag){
            this.selected = this.selected.filter(item => item.id !== tag.id);
        }
    }

}
</script>