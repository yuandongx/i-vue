<template>
  <a-menu mode="inline" theme="dark" :inline-collapsed="menu_collapsed">
    <Item
    v-for="item  in items"
    :key="item.name"
    :itemData="item"
    ></item>
  </a-menu>
</template>
<script>
import { inject } from 'vue';
import items from "../libs/menu"
import Item from "./basic/MenuItem.vue";
export default {
  data: function(){
    return {
      items: items
      }
  },
  components: {
    Item
  },
  setup(){
    const menu_collapsed = inject("collapsed", false);
    return {
      menu_collapsed
    }
  }
};
</script>
