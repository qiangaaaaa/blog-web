<template>
    <div class="domain">
        <div class="input space">
            <span>姓名：</span>
            <el-input placeholder="请输入内容" v-model="input" clearable>
            </el-input>
        </div>
        <div class="input space">
            <span>姓名：</span>
            <el-input placeholder="请输入内容" v-model="input" clearable>
            </el-input>
        </div>
        <div class="space">
            <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
        </div>
        <div class="space">
            <el-button icon="el-icon-refresh-right" round>重置</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Domain',
        data() {
            return {
                input: ''
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
    .domain {
        display: flex;

        width: 100%;
        height: 90px;

        align-items: center;

        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    }

    .space {
        margin-left: 20px;
    }

    .input {
        display: flex;
        align-items: center;
        width: 250px;
    }

    .input span {
        white-space: nowrap;
    }
</style>