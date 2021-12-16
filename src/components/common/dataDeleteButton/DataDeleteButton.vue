<template>
    <div class="data-delete-button">
        <!-- 使用v-if 两层 解决 边框 和 内容 问题 -->
        <el-button type="danger" :icon="deleteButton.buttonStyle.icon" circle @click="deleteRow" v-if="notMarginLeft"></el-button>
        <el-button type="danger" :icon="deleteButton.buttonStyle.icon" round @click="deleteRow" v-else>{{deleteButton.deleteButtonText}}</el-button>
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
            // 原因：el-button中有字符串，会生成span标签，增加margin-left
            notMarginLeft() {
                return this.deleteButton.deleteButtonText === ''
            }
        },
        methods: {
            deleteRow() {
                this.open()
            },
            // 删除-模态框
            open() {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
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
            deleteButton: {
                type: Object,
                default: {
                    deleteInfo: {},
                    deleteButtonText: '',
                    buttonStyle: {
                        icon: ''
                    }
                }
            },
        }
    }
</script>
<style scoped>
    .data-delete-button {
        display: inline-block;
        margin: 7px 15px;
    }
</style>