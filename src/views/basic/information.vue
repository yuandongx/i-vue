<template>
  <a-badge :count="10">
    <a
      href="#"
      class="head-example"
    />
    <notification-two-tone />
  </a-badge>
</template>
<script>
import { Badge } from "ant-design-vue";
import { NotificationTwoTone } from "@ant-design/icons-vue";
export default {
    components: {
        [Badge.name]: Badge,
        NotificationTwoTone
    }
}
</script>