<template>
    <login-form @next="goNext"/>
</template>
<script>
import loginForm from "./theForm.vue";
export default {
    props: {
        next: {
            type: String,
            default: "/",
        }
    },
    mounted(){
    },
    components: {
        "login-form": loginForm,
    },
    methods: {
        goNext(){
            if (this.next.startsWith("/")){
                if(this.next.trim() === "/" || this.next.trim() === ""){
                    this.$router.push({path: '/dashboard' });
                } else {
                    this.$router.push({path: this.next});
                }
            }
        }
    }
}
</script>