<template>
    <div>
        <el-button type="success" icon="el-icon-plus" round @click="show">添加</el-button>

        <el-dialog title="新增" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item :label="item" v-for="(item,index) in keys" :key='index'>
                    <el-input v-model="addData[item]" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addQuick">立即添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { addUser } from 'network/common'
    import { clearData } from 'common/utils'

    export default {
        name: 'DataAddButton',
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                dialogFormVisible: false,
                addData: {}
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
            show() {
                this.dialogFormVisible = true
            },
            // 立即添加
            addQuick() {
                const nowUrl = this.$parent.$parent.url
                addUser(`${nowUrl}/save`, this.addData).then(res => {
                    // 关闭模态框
                    this.dialogFormVisible = false
                    // 返回成功
                    if (res.data.status == 0) {
                        // 对数据进行清空
                        clearData(this.addData)
                        // 消息提示成功
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                    }

                }).catch(() => {
                    this.dialogFormVisible = false
                    this.$message({
                        type: 'info',
                        message: '添加时发送未知错误,请重试！'
                    });
                })
            },
            // 取消按钮 点击事件
            cancel() {
                // 对数据进行清空
                clearData(this.addData)
                // 关闭模态框
                this.dialogFormVisible = false
                // 提示已取消
                this.$message({
                    type: 'info',
                    message: '取消添加'
                });
            },

        },
        props: {
            keys: {
                type: Array,
                default: []
            },
        }
    }
</script>
<style scoped>

</style>