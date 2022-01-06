<template>
    <div class="category-add-and-edit-dialog">
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'CategoryAddAndEditDialog',
        data() {
            return {
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => { });
            }
        },
        props: {
            // 对话框类型 add or edit
            dialogType: {
                type: String,
            },
            // 请求的接口
            requestUrl: {
                type: String
            },
            // 表头-即要添加的内容名称
            key: {
                type: Array,
                default() {
                    return []
                }
            },
            // 对话框是否显示
            dialogVisible: {
                type: Boolean,
                default() {
                    return false
                }
            }
        }
    }
</script>
<style scoped>

</style>