<template>
    <div class="category-add-button-dialog">
        <el-dialog :title="elDialogTitle" :visible.sync="isDialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <!-- 添加按钮独特 -->
                <el-form-item label="父分类id" v-if="isAdd">
                    <el-input v-model="parentCategoryId" disabled></el-input>
                </el-form-item>
                <!-- 编辑按钮独特 -->
                <el-form-item label="分类id" v-if="!isAdd">
                    <el-input v-model="formData.categoryId" disabled></el-input>
                </el-form-item>
                <el-form-item label="分类名" prop="categoryName">
                    <el-input v-model="ruleForm.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="分类图标地址" prop="iconUrl">
                    <el-select v-model="ruleForm.iconUrl" filterable placeholder="可选择分类图标地址" @blur="selectBlur">
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
                <el-button type="primary" @click="submit" :disabled="isSubmit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { addCategory, updateCategory } from 'network/category'

    // 分类管理-添加按钮模态框
    export default {
        name: 'CategoryAddButtonDialog',
        data() {
            return {
                // 表单数据
                ruleForm: {
                    categoryName: '',
                    iconUrl: '',
                    sort: '',
                    showStatus: ''
                },
                // 编辑状态时，最初始状态
                initial: {
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
                isDialogVisible: false,
                isSubmit: true, // 是否可以提交（需通过校验）
            }
        },
        computed: {
            // 当前功能是否是添加功能
            isAdd() {
                return this.dialogType === '添加'
            },
            // el-dialog的title
            elDialogTitle() {
                return this.dialogType + '分类'
            }
        },
        methods: {
            // 数据添加or更新
            categoryAddOrUpdate(postData) {
                console.log(postData);
                let fn = null
                if (this.isAdd) {
                    fn = addCategory
                } else {
                    fn = updateCategory
                }
                fn(postData).then(res => {
                    if (res.data.status === 0) {
                        // 操作成功
                        this.$message({
                            message: `${this.dialogType}标签成功`,
                            type: 'success'
                        });
                    } else {
                        // 操作失败
                        this.$message.error(res.data.message)
                    }
                })
            },
            // 鼠标移出对话框外并发生点击事件
            handleClose(done) {
                const _this = this
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.$options.methods.addButtonDialogClose(_this)
                        this.$message({
                            type: 'info',
                            message: `已取消${this.dialogType}分类。`
                        });
                    })
                    .catch(_ => { });
            },
            // 下拉框
            selectBlur(e) {
                this.ruleForm.iconUrl = e.target.value
            },
            // 对话框关闭
            addButtonDialogClose(_this) {
                // 告诉父组件已关闭
                _this.$emit('addButtonDialogClose')
                // 清空本组件所有数据
                _this.clearData()
            },
            // 取消按钮点击事件
            cancel() {
                this.$options.methods.addButtonDialogClose(this)
                this.isDialogVisible = false
                this.$message({
                    type: 'info',
                    message: `已取消${this.dialogType}分类。`
                });
            },
            // 提交按钮点击事件
            submit() {
                let postData = {}
                if (this.isAdd) {
                    postData = Object.assign({}, this.ruleForm, { parentCategoryId: this.parentCategoryId })
                } else {
                    postData = Object.assign({}, this.ruleForm, { categoryId: this.formData.categoryId })
                }
                // 添加或更新数据
                this.categoryAddOrUpdate(postData)
                // 告诉父组件需要刷新
                this.$emit('refresh')
                // 关闭对话框
                this.isDialogVisible = false
                this.$options.methods.addButtonDialogClose(this)
            },
            // 清空数据
            clearData() {
                if (this.isAdd) {
                    // 添加按钮还原
                    for (const item in this.ruleForm) {
                        this.ruleForm[item] = ''
                    }
                } else {
                    // 编辑按钮还原
                    this.ruleForm.categoryName = this.initial.categoryName
                    this.ruleForm.iconUrl = this.initial.iconUrl
                    this.ruleForm.sort = this.initial.sort
                    this.ruleForm.showStatus = this.initial.showStatus
                }
            }
        },
        watch: {
            // 更新对话框状态
            dialogVisible(newValue) {
                this.isDialogVisible = newValue
            },
            // 表单实时校验
            ruleForm: {
                handler: function (newValue, oldValue) {
                    if (this.isAdd) {
                        this.$refs.ruleForm.validate((isPass) => {
                            this.isSubmit = !isPass
                        })
                    } else {
                        this.isSubmit = false
                    }
                },
                deep: true
            },
            // 将数据放入ruleForm中
            formData(newValue) {
                this.ruleForm.categoryName = newValue.categoryName || ''
                this.ruleForm.iconUrl = newValue.iconUrl || ''
                this.ruleForm.sort = newValue.sort || ''
                this.ruleForm.showStatus = newValue.showStatus || ''

                // 保存最初状态
                this.initial.categoryName = newValue.categoryName || ''
                this.initial.iconUrl = newValue.iconUrl || ''
                this.initial.sort = newValue.sort || ''
                this.initial.showStatus = newValue.showStatus || ''
            }
        },
        props: {
            // 父标签id
            parentCategoryId: {
                type: Number,
                default() {
                    return 0
                }
            },
            // 对话框是否显示
            dialogVisible: {
                type: Boolean,
            },
            // 对话框类型（添加还是修改？）
            dialogType: {
                type: String,
                default() {
                    return '添加'
                }
            },
            // 传输的数据
            formData: {
                type: Object,
                default() {
                    return {
                        categoryId: 0,
                    }
                }
            }
        }
    }
</script>
<style scoped>

</style>