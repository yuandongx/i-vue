<template>
  <a-menu
    mode="inline"
    theme="dark"
    :inline-collapsed="menu_collapsed"
  >
    <item
      v-for="item in items"
      :key="item.name"
      :item-data="item"
    />
  </a-menu>
</template>
<script>
import items from "../libs/menu";
import Item from "./basic/MenuItem.vue";
import { Menu } from "ant-design-vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("menu");
var count = 0;
function mapItems(ms){
  const rs = [];
  for (const n of ms) {
    if (n.children !== undefined && n.children.length > 0) {
      n.children = mapItems(n.children);
    }
    n.id = count.toString();
    rs.push(n);
  }
  return rs;
}
const menuItems = mapItems(items);
export default {
  data: function () {
    return {
      items: menuItems,
    };
  },
  components: {
    Item,
    "a-menu": Menu
  },
  computed: {
    ...mapState({ menu_collapsed: "collapsed" }),
  },
};
</script>
