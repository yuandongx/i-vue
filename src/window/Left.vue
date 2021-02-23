<template>
  <a-menu mode="inline" theme="dark" :inline-collapsed="menu_collapsed">
    <Item
    v-for="item in items"
    :key="item.name"
    :itemData="item"
    ></item>
  </a-menu>
</template>
<script>
import items from "../libs/menu"
import Item from "./basic/MenuItem.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("menu");
export default {
  data: function(){
    return {
      items: items
      }
  },
  components: {
    Item,
  },
  computed: {
    ...mapState({menu_collapsed: "collapsed"}),
  }
};
</script>
