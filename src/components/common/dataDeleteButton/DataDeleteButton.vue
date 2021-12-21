<template>
    <div class="data-delete-button">
        <!-- 使用v-if 两层 解决 边框 和 内容 问题 -->
        <el-button type="danger" :icon="deleteButton.buttonStyle.icon" circle @click="deleteRow" v-if="notMarginLeft">
        </el-button>
        <el-button type="danger" :icon="deleteButton.buttonStyle.icon" round @click="deleteRow" v-else>
            {{deleteButton.deleteButtonText}}</el-button>
    </div>
</template>
<script>
    import { deleteUser } from 'network/common'

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
            // 删除按钮点击事件
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
                    deleteUser(this.requestUrl, this.data).then(res => {
                        // 返回成功
                        if (res.data.status == 0) {
                            // 消息提示成功
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            // 刷新表格数据
                            this.$emit('refresh')
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                }).catch(() => {
                    // 消息提示失败
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });
            },
            // 刷新数据
            refresh() {
                this.$emit('refresh')
            }
        },
        props: {
            deleteButton: {
                type: Object,
                default: {
                    deleteButtonText: '',
                    buttonStyle: {
                        icon: ''
                    }
                }
            },
            data: {
                type: Array,
                default: []
            },
            requestUrl: {
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
</style>