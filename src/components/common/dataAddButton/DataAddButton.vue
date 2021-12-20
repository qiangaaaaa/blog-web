<template>
    <div>
        <el-button type="success" icon="el-icon-plus" round @click="show">添加</el-button>
        <el-dialog title="新增" :visible.sync="dialogFormVisible">
            <el-form :model="addData" :rules="rules">
                <el-form-item :label="item" v-for="(item,index) in keys" :key='index' :prop="item">
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
                },
                dialogFormVisible: false,
                addData: {},
                // 表单验证规则
                rules: {}
            }
        },
        watch: {
            keys(newValue, oldValue) {
                newValue.forEach(item => {
                    if (item === 'email') {
                        this.rules[item] = [
                            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]
                    }else {
                        this.rules[item] = [
                            { required: true, message: `请输入${item}`, trigger: 'blur' },
                        ]
                    }
                })
            }
        },
        computed: {
        },
        methods: {
            show() {
                this.dialogFormVisible = true
            },
            // 立即添加
            addQuick() {
                addUser(this.requestUrl, this.addData).then(res => {
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
                        // 刷新表格数据
                        this.$emit('refresh')
                    } else {
                        this.dialogFormVisible = false
                        this.$message.error(res.data.message);
                    }

                }).catch(() => {
                    this.dialogFormVisible = false
                    this.$message.error('错误,请检查填写内容后后重试！！');

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
            requestUrl: {
                type: String,
                default: ''
            }
        }
    }
</script>
<style scoped>

</style>