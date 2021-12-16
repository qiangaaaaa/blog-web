<template>
    <div class="data-show">
        <template>
            <el-table :data="tableData" style="width: 100%" @select="tableSelect">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <data-edit-button :data="scope.row"></data-edit-button>
                        <data-delete-button :deleteButton="deleteButton"></data-delete-button>
                    </template>
                </el-table-column>

            </el-table>
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
                    deleteInfo: {},
                    deleteButtonText: '',
                    buttonStyle: {
                        icon: 'el-icon-delete'
                    },
                },
                rowSelected: 0, // 已选中的行数量
                buttonStyle: {
                    icon: 'el-icon-delete',
                    isRound: false,
                    isCircle: true
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        created() {
        },
        mounted() {
        },
        computed: {
        },
        methods: {
            // 编辑
            handleEdit(index, row) {
                console.log(index, row);
            },
            // 删除
            handleDelete(index, row) {
                console.log(index, row);
                this.open()
            },
            // 当发生某行选中事件
            tableSelect(selection, row) {
                // 子传父（UserManage）
                this.$emit('rowSelected',selection)
            }
        },
        components: {
            DataEditButton,
            DataDeleteButton
        }
    }
</script>
<style scoped>
    .data-show {
        margin-top: 20px;
        height: calc(100% - 90px - 20px);
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    }
</style>