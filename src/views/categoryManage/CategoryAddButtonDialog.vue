<template>
    <div class="category-add-button-dialog">
        <el-dialog title="添加分类" :visible.sync="isDialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="父分类id">
                    <el-input v-model="ruleForm.parentCategoryId" disabled></el-input>
                </el-form-item>
                <el-form-item label="分类名" prop="categoryName">
                    <el-input v-model="ruleForm.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="分类图标地址" prop="iconUrl">
                    <el-select v-model="ruleForm.iconUrl" filterable placeholder="请选择分类图标地址" @blur="selectBlur">
                        <el-option value=" el-icon-delete">
                            <i class="el-icon-delete">el-icon-delete</i>
                        </el-option>
                        <el-option value="el-icon-eleme">
                            <i class="el-icon-eleme">el-icon-eleme</i>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="ruleForm.sort"></el-input>
                </el-form-item>
                <el-form-item label="是否显示" prop="showStatus">
                    <el-radio-group v-model="ruleForm.showStatus">
                        <el-radio label="0">显示</el-radio>
                        <el-radio label="1">不显示</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </span>
        </el-dialog>
        {{ruleForm}}
    </div>
</template>
<script>
    // 分类管理-添加按钮模态框
    export default {
        name: 'CategoryAddButtonDialog',
        data() {
            return {
                // 表单数据
                ruleForm: {
                    parentCategoryId: 0,
                    categoryName: '',
                    iconUrl: '',
                    sort: '',
                    showStatus: ''
                },
                // 表单验证规则
                rules: {
                    categoryName: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                    ],
                    showStatus: [
                        { required: true, message: '请选择是否显示', trigger: 'change' }
                    ],
                },
                isDialogVisible: false
            }
        },
        methods: {
            // 鼠标移出对话框外并发生点击事件
            handleClose(done) {
                const _this = this
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.$options.methods.addButtonDialogClose(_this)
                    })
                    .catch(_ => { });
            },
            // 下拉框
            selectBlur(e) {
                this.ruleForm.iconUrl = e.target.value
            },
            // 告诉CategoryManage.vue本模态框已关闭
            addButtonDialogClose(_this) {
                _this.$emit('addButtonDialogClose')
            },
            // 取消按钮点击事件
            cancel() {
                this.$options.methods.addButtonDialogClose(this)
                this.isDialogVisible = false
            },
            // 提交按钮点击事件
            submit() {
                this.$options.methods.addButtonDialogClose(this)
                this.isDialogVisible = false
            }
        },
        watch: {
            // 更新父标签id
            parentCategoryId(newValue) {
                this.ruleForm.parentCategoryId = newValue
            },
            // 更新对话框状态
            dialogVisible(newValue) {
                this.isDialogVisible = newValue
            }
        },
        props: {
            // 父标签id
            parentCategoryId: {
                type: Number,
                default() {
                    return 999
                }
            },
            // 对话框是否显示
            dialogVisible: {
                type: Boolean,
            }
        }
    }
</script>
<style scoped>

</style>