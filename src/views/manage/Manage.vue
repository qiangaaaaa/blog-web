<template>
    <div>
        <el-form :model="dynamicValidateForm" label-width="100px" :rules="rules">
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="dynamicValidateForm.email"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dynamicValidateForm: {
                    email: ''
                },
                rules: {
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]
                }
            };
        },
        methods: {
        }
    }
</script>
<style scoped>

</style>