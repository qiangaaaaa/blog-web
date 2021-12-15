<template>
    <div class="user-manage">
        <!-- 功能区 -->
        <domain></domain>
        <!-- 信息展示区 -->
        <data-show></data-show>
    </div>
</template>
<script>
    import Domain from 'components/content/domain/Domain'
    import DataShow from 'components/content/dataShow/DataShow'
    export default {
        name: 'UserManage',
        data() {
            return {
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
        },
        components: {
            Domain,
            DataShow
        }
    }
</script>
<style scoped>
 .user-manage {
     height: 100%;
 }
</style>