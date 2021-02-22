<template>
  <!-- <Window />  直接用路由来导航-->
  <router-view name="login"></router-view>
  <router-view name="windows"></router-view>
  <router-view name="ssh"></router-view>
</template>
// <!-- 这个也没有必要了， 先注释掉，后续用不上了可删除了-->
<script>

export default {
  props: {
    
        next: {
            type: String,
            default: "111111111111",
        }
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
