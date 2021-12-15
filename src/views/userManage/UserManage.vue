<template>
    <div class="user-manage">
        <!-- 功能区 -->
        <domain :selection="selection"></domain>
        <!-- 信息展示区 -->
        <data-show @rowSelected="rowSelected"></data-show>
    </div>
</template>
<script>
    import Domain from 'components/content/domain/Domain'
    import DataShow from 'components/content/dataShow/DataShow'
    export default {
        name: 'UserManage',
        data() {
            return {
                selection:[]
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
            rowSelected(selection) {
                this.selection = selection
            }
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