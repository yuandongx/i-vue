<template>
    <a-menu-item v-if="itemData.children === undefined || itemData.children.length === 0">
        <router-link :to="itemData.path">
            <component :is="itemData.icon" />
            <span>{{ itemData.title }}</span>
        </router-link>
    </a-menu-item>
    <a-sub-menu v-else-if="itemData.children.length > 0">
        <template #title>
            <span><component :is="itemData.icon" /><span>{{ itemData.title }}</span></span>
        </template>
        <template v-for=" item in itemData.children">
            <a-menu-item :key="item.name" v-if="item.children === undefined || item.children.length === 0">
                <router-link :to="item.path">
                    <span>{{ item.title }}</span>
                </router-link>
            </a-menu-item>
            <a-sub-menu :key="item.name" v-else-if="item.children.length > 0">
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
                <a-menu-item v-for="i in item.children" :key="i.name">
                    <router-link :to="i.path">
                        <span>{{ i.title }}</span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </template>
    </a-sub-menu>
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