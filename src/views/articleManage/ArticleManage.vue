<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog title="编辑文章" :visible.sync="dialogVisible" fullscreen :before-close="handleClose">
            <mavon-editor v-model="value" />
        </el-dialog>
        {{value}}
    </div>
</template>
<script>
    export default {
        name: 'ArticleManage',
        data() {
            return {
                value: '',
                dialogVisible: false
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
        },
    }
</script>
<style scoped>

</style>