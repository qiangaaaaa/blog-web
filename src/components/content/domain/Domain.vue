<template>
    <div class="domain">
        <div class="input space">
            <span>模糊查询：</span>
            <el-input placeholder="请输入内容" v-model="search" clearable @input="searchInput">
            </el-input>
        </div>
        <div class="space">
            <el-button type="primary" icon="el-icon-search" round @click="searchClick">查询</el-button>
        </div>
        <div class="space">
            <el-button icon="el-icon-refresh-right" round @click="reset">重置</el-button>
        </div>
        <div class="space" v-if="deleteShow">
            <data-delete-button :deleteButton="deleteButton" :data="deleteData" requestUrl="casualuser/delete"
                @refresh="refresh">
            </data-delete-button>
        </div>
        <div class="addButton">
            <data-add-button :keys="keys.slice(1)" requestUrl="casualuser/save" @refresh="refresh"></data-add-button>
        </div>
    </div>
</template>
<script>
    import DataDeleteButton from 'components/common/dataDeleteButton/DataDeleteButton'
    import DataAddButton from 'components/common/dataAddButton/DataAddButton'
    import { searchInputDebounceMixin } from 'common/mixin'

    export default {
        name: 'Domain',
        data() {
            return {
                search: '',
                deleteButton: {
                    deleteInfo: {},
                    deleteButtonText: '',
                    buttonStyle: {},
                },
                // 按钮是否显示
                deleteShow: false,
            }
        },
        computed: {
            // 删除按钮要删除的数据（仅包含id）
            deleteData() {
                let delData = []
                this.selection.forEach(item => {
                    delData.push(Object.values(item)[0])
                });
                return delData
            }
        },
        watch: {
            selection(newValue, oldValue) {
                // 传递 deleteButton信息
                this.deleteButton.deleteButtonText = '删除选中项' + '(' + newValue.length + ')'
                this.deleteShow = newValue.length !== 0
            }
        },
        methods: {
            // 清空搜索框内容
            reset() {
                this.search = ''
                // 刷新表格
                this.searchClick()
            },
            // 点击搜索按钮 点击事件触发
            searchClick() {
                this.$parent.getUserManageData(1, this.search)
            },
            // 数据刷新
            refresh() {
                // 删除按钮不显示
                this.deleteShow = false
                // 子传父 刷新
                this.$emit('refresh')
            }
        },
        components: {
            DataDeleteButton,
            DataAddButton
        },
        props: {
            keys: {
                type: Array,
                default: []
            },
            selection: {
                type: Array,
                default: []
            }
        },
        mixins: [searchInputDebounceMixin]
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

    .addButton {
        margin: 0 200px 0 auto;
    }
</style>