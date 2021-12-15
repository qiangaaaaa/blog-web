<template>
    <div class="domain">
        <div class="input space">
            <span>模糊查询：</span>
            <el-input placeholder="请输入内容" v-model="search" clearable>
            </el-input>
        </div>
        <div class="space">
            <el-button type="primary" icon="el-icon-search" round>查询</el-button>
        </div>
        <div class="space">
            <el-button icon="el-icon-refresh-right" round @click="reset">重置</el-button>
        </div>
        <div class="space" v-if="deleteShow">
            <el-button type="danger" round>删除选中项{{selectionNum}}</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Domain',
        data() {
            return {
                search: ''
            }
        },
        created() {
        },
        computed: {
            selectionNum() {
                return '（' + this.selection.length + '）'
            },
            deleteShow() {
                return this.selection.length !== 0 
            }
        },
        methods: {
            // 清空搜索框内容
            reset() {
                this.search = ''
            }
        },
        props: {
            selection: {
                type: Array,
                default: []
            }
        }
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