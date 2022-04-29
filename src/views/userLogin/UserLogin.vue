<template>
    <div id="user-login">
        <h1>登录</h1>
        <button @click="toPath">登录</button>
    </div>
</template>
<script>
    export default {
        name: 'UserLogin',
        data() {
            return {
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
            toPath() {
                this.$router.push('/manage').catch(err => err)
            }
        },
    }
</script>
<style scoped>

</style>