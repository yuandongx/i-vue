<template>
    <a-row>
    <a-col :span="2">
          <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="switch_collapsed"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="switch_collapsed"
        />
    </a-col>
    <a-col :span="20">
        <!-- <h1>欢迎登录</h1> -->
    </a-col>
    <a-col :span="2">
        <the-login-center></the-login-center>
    </a-col>
    </a-row>
</template>
<script>
import { Row, Col } from "ant-design-vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { createNamespacedHelpers } from "vuex";
import LoginCenter from "./basic/loginCenter";
const { mapMutations } =  createNamespacedHelpers("menu");
export default {
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        "the-login-center": LoginCenter,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
    },
    data(){
        return {
            collapsed: true,
        }
    },
    methods: {
        switch_collapsed: function() {
            this.collapsed = !this.collapsed;
            this.onCollapsed(this.collapsed);
        },
        ...mapMutations({onCollapsed: "onCollapsed"}),
    }
}
</script>