<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
    style="min-height: 100vh"
  >
    <a-layout-sider
      :collapsed="menu_collapsed"
      :trigger="null"
      collapsible
      style="{ overflow: 'auto', height: '2000vh', position: 'fixed', left: 0}"
    >
      <div class="logo" />
      <the-left />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <the-header />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view name="center" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>

import Left from "./Left.vue";
import Header from "./Top";
import { createNamespacedHelpers } from "vuex";
import { Layout } from "ant-design-vue";
const { mapState } = createNamespacedHelpers("menu");
export default {
  components: {
    "the-left": Left,
    "the-header": Header,
    "a-layout": Layout,
    "a-layout-content": Layout.Content,
    "a-layout-header": Layout.Header,
    "a-layout-sider": Layout.Sider
  },
  data() {
    return {
      selectedKeys: ["1"],
    };
  },
  computed: {
    ...mapState({menu_collapsed: "collapsed"}),
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
