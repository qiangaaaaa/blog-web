<template>
    <div class="data-show">
        <template>
            <el-table :data="tableData.list" style="width: 100%" @select="tableSelect" @select-all="tableSelect">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column :prop="item" :label="item" v-for="(item,index) in keys" :key="index">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <data-edit-button :data="scope.row"></data-edit-button>
                        <data-delete-button :deleteButton="deleteButton"></data-delete-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block paging">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="tableData.currPage"
                    :page-size="tableData.pageSize*10" layout="prev, pager, next, jumper"
                    :total="tableData.totalCount*10">
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
                    deleteInfo: {},
                    deleteButtonText: '',
                    buttonStyle: {
                        icon: 'el-icon-delete'
                    },
                },
                tableData: {},
                rowSelected: 0, // 已选中的行数量
                allData: `{
  "status": 0,
  "message": "操作成功",
  "data": {
    "totalCount": 11,
    "pageSize": 5,
    "totalPage": 3,
    "currPage": 1,
    "list": [
      {
        "casualUserId": 19,
        "email": "9@qq.com",
        "nickname": "aa"
      },
      {
        "casualUserId": 18,
        "email": "8@qq.com",
        "nickname": "aa"
      },
      {
        "casualUserId": 17,
        "email": "7@qq.com",
        "nickname": "aa"
      },
      {
        "casualUserId": 16,
        "email": "6@qq.com",
        "nickname": "aa"
      },
      {
        "casualUserId": 15,
        "email": "5@qq.com",
        "nickname": "aa"
      }
    ]
  }
}`
            }
        },
        created() {
            this.tableData = eval('(' + this.allData + ')').data
        },
        mounted() {
        },
        computed: {
            myData() {
                return eval('(' + this.allData + ')').data
            },
            keys() {
                return Object.keys(eval('(' + this.allData + ')').data.list[0])
            }
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
                this.$emit('rowSelected', selection)
            },
            // 当前页数发生改变时
            handleCurrentChange(currentPage) {

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