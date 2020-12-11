<template>
    <a-menu-item>
    <router-link :to="itemData.path">
        <component :is="itemData.icon" />
        <span>{{ itemData.title }}</span>
    </router-link>
    </a-menu-item>
</template>
<script>
export default {
    props: {
        itemData: Object,
    },
    data: function(){
        return {}
    }
}
</script>