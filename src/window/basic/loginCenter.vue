<template>
  <span style="margin-right: 24px">
    <a-badge :count="1">
      <a-avatar size="larg">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </a-badge>
  </span>
</template>
<script>
import { Avatar, Badge } from "ant-design-vue";
import { UserOutlined } from "@ant-design/icons-vue";
export default {
  components:{
    [Avatar.name]: Avatar,
    [Badge.name]: Badge,
    UserOutlined
  }
}
</script>