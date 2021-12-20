<template>
    <div class="data-show">
        <template>
            <el-table :data="list" style="width: 100%" @select="tableSelect" @select-all="tableSelect">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column :prop="item" :label="item" v-for="(item,index) in keys" :key="index">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <data-edit-button :data="scope.row" requestUrl="casualuser/update" @refresh="refresh"></data-edit-button>
                        <data-delete-button :data="scope.row" :deleteButton="deleteButton" requestUrl="casualuser/delete" @refresh="refresh"></data-delete-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block paging">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currPage"
                    :page-size="pageSize*10" layout="prev, pager, next, jumper"
                    :total="totalCount*10">
                </el-pagination>
            </div>
        </template>
    </div>
</template>
<script>
    import DataEditButton from 'components/common/dataEditButton/DataEditButton'
    import DataDeleteButton from 'components/common/dataDeleteButton/DataDeleteButton'
    export default {
        name: 'DataShow',
        data() {
            return {
                deleteButton: {
                    deleteButtonText: '',
                    buttonStyle: {
                        icon: 'el-icon-delete'
                    },
                },
                rowSelected: 0, // 已选中的行数量
                list: [], // data`s list
                pageSize: 0, // data`s pageSize
                currPage: 0, // data`s currPage
                totalCount: 0, // data`s totalCount
            }
        },
        mounted() {
        },
        methods: {
            // 当发生某行选中事件
            tableSelect(selection, row) {
                // 子传父（UserManage）
                this.$emit('rowSelected', selection)
            },
            // 当前页数发生改变时
            handleCurrentChange(currPage) {
                this.$emit('currPageChange',currPage)
            },
            // 数据刷新
            refresh() {
                this.$emit('refresh')
            },
        },
        components: {
            DataEditButton,
            DataDeleteButton
        },
        props: {
            tableData: {
                type: Object,
                default() {
                    return {}
                }
            },
            keys: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        watch: {
            tableData(newValue, oldValue) {
                this.list = newValue.list
                this.pageSize = newValue.pageSize
                this.currPage = newValue.currPage
                this.totalCount = newValue.totalCount
            }
        }
    }
</script>
<style scoped>
    .data-show {
        padding: 10px;
        margin-top: 20px;
        height: calc(100% - 90px - 40px);
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    }

    .paging {
        float: right;
        margin: 30px 30px 0 0;
    }
</style>