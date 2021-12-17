<template>
    <div class="user-manage">
        <!-- 功能区 -->
        <domain :selection="selection"></domain>
        <!-- 信息展示区 -->
        <data-show @rowSelected="rowSelected" :tableData="tableData" @currPageChange="currPageChange"></data-show>
    </div>
</template>
<script>
    import Domain from 'components/content/domain/Domain'
    import DataShow from 'components/content/dataShow/DataShow'

    import { getUserManageData } from 'network/userManage'

    export default {
        name: 'UserManage',
        data() {
            return {
                selection: [], // 选中的数据
                tableData: {}, // 就是接口中的data部分
                page: 1 // 当前访问到第几页数据
            }
        },
        created() {
            this.getUserManageData()
        },
        computed: {
        },
        watch: {
            page(newValue, oldValue) {
                this.getUserManageData()
            }
        },
        methods: {
            // 子组件传给父组件选中的数据
            rowSelected(selection) {
                this.selection = selection
            },
            // 请求getUserManageData封装
            getUserManageData() {
                getUserManageData(this.page).then(res => {
                    this.tableData = res.data.data
                })
            },
            currPageChange(currPage) {
                this.page = currPage
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