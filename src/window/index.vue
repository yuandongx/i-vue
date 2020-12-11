<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
    style="min-height: 100vh"
  >
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      style="{ overflow: 'auto', height: '2000vh', position: 'fixed', left: 0}"
    >
      <div class="logo" />
      <Left />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import Left from "./Left.vue";
import { provide, ref } from 'vue';
export default {
  components: {
    Left,
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup(){
    const collapsed = ref(true);
    provide("collapsed", collapsed);
    return {
      collapsed
    }
  },
  data() {
    return {
      selectedKeys: ["1"],
    };
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
