<template>
    <div class="data-delete-button">
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow"
            v-bind:class="{ notMarginLeft:notMarginLeft}">{{buttonText}}</el-button>
        <!-- 使用v-if 两层 解决 边框 和 内容 问题 -->
    </div>
</template>
<script>
    // 注：此按钮只能删除一个数据
    export default {
        name: 'DataDeleteButton',
        data() {
            return {
            }
        },
        created() {
        },
        computed: {
            notMarginLeft() {
                return this.buttonText === ''
            }
        },
        methods: {
            deleteRow() {
                this.open()
            },
            // 删除-模态框
            open() {
                this.$confirm('此操作将永久删除该行数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    // post请求 删除数据
                    // 消息提示成功
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    // 消息提示失败
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        props: {
            // 要删除的数据的信息 基本提供：1.表名 2.要删除的数据
            // deleteInfo: {
            //     type: Object,
            //     default: {}
            // },
            // buttonStyle: {
            //     type: Object,
            //     default: {
            //         icon: 'el-icon-delete',
            //         isRound: false,
            //         isCircle: true
            //     }
            // },
            buttonText: {
                type: String,
                default: ''
            }
        }
    }
</script>
<style scoped>
    .data-delete-button {
        display: inline-block;
        margin: 7px 15px;
    }

    .data-delete-button i{
        color: red;

    }

</style>