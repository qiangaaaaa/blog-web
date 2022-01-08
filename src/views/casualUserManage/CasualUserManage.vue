<template>
    <div class="user-manage">
        <!-- 功能区 -->
        <domain :selection="selection" :keys="keys" @refresh="refresh" :url='url'></domain>
        <!-- 信息展示区 -->
        <data-show @rowSelected="rowSelected" :tableData="tableData" :url='url' :keys="keys" @currPageChange="currPageChange" @refresh="refresh">
        </data-show>
    </div>
</template>
<script>
    import Domain from 'components/content/domain/Domain'
    import DataShow from 'components/content/dataShow/DataShow'

    import { getCasualUserData } from 'network/casualUser'

    export default {
        name: 'CasualUserManage',
        data() {
            return {
                selection: [], // 选中的数据
                tableData: {}, // 就是接口中的data部分
                page: 1, // 当前访问到第几页数据
                keys: [], // 表头
                url: 'casualuser', // 用于网络请求定位是哪个表,
            }
        },
        created() {
            // 初始化数据
            this.getData()
        },
        computed: {
        },
        watch: {
            page(newValue, oldValue) {
                this.getData()
            }
        },
        methods: {
            // 子组件传给父组件选中的数据
            rowSelected(selection) {
                this.selection = selection
            },
            // 请求getCasualUserData封装
            getData(dataPage = this.page, dataKey = '') {
                getCasualUserData(dataPage, dataKey).then(res => {
                    this.tableData = res.data.data
                    // 更新表头
                    this.keys = Object.keys(this.tableData.list[0] || {})
                    // 手动表头
                    this.keys = this.keys.length === 0 ? ["casualUserId","email","nickname"] : this.keys
                })
            },
            currPageChange(currPage) {
                this.page = currPage
            },
            refresh() {
                // 重置选中的数据
                this.selection = []
                // 重新请求第一页数据
                this.getData(1)
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