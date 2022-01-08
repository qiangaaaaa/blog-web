<template>
    <div class="block">
        <el-button type="primary" plain icon="el-icon-folder-add" @click="rootAppend">添加根标签</el-button>
        <el-button type="primary" plain icon="el-icon-s-operation" @click="allExpand">全部展开</el-button>
        <el-tree :data="data" default-expand-all @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd"
            @node-drop="handleDrop" draggable :allow-drop="allowDrop" :expand-on-click-node="false" ref="tree"
            class="categoryTree">
            <div class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ data.categoryName }}</span>
                <span>
                    <i class="el-icon-circle-plus-outline categoryButton" @click="() => append(node,data)">添加</i>
                    <i class="el-icon-remove-outline categoryButton" @click="() => remove(node, data)">删除</i>
                    <i class="el-icon-zoom-in categoryButton">编辑</i>
                </span>
            </div>
        </el-tree>
        </el-alert>
        <CategoryAddButtonDialog :parentCategoryId="addCategoryParentId" :dialogVisible="addButtonDialogVisible"
            @addButtonDialogClose="addButtonDialogClose"></CategoryAddButtonDialog>
    </div>
</template>
<script>
    import CategoryAddButtonDialog from './CategoryAddButtonDialog'

    import { getMaxDepth, throttle } from 'common/utils'
    import { getCategory } from 'network/category'

    let id = 1000;
    export default {
        name: 'CategoryManage',
        data() {
            return {
                data: [],
                nodeMaxDepth: 2, // 树形节点最大深度
                isAllExpand: false, // 是否全部展开
                errorMessageAlert: null,
                addButtonDialogVisible: false, // 是否显示添加按钮对话框
                addCategoryParentId: 0, // 添加按钮传给对话框的父标签id
            }
        },
        created() {
            // 从数据库中读取数据
            this.getCategory()
            // 初始化错误提示节流函数
            this.errorMessageAlert = throttle(() => {
                // 超过最大深度
                this.$message.error(`添加失败！标签树最大级数为${this.nodeMaxDepth}级`);
            })
        },
        methods: {
            // 是否展开
            allExpand() {
                this.$refs.tree.$children.forEach(item => {
                    item.expanded = this.isAllExpand
                })
                this.isAllExpand = !this.isAllExpand
            },
            // 添加根标签
            rootAppend() {
                const newChild = {
                    id: id++,
                    categoryName: 'testtest',
                    children: []
                }
                this.data.push(newChild)
                // 初始化
                this.addCategoryParentId = 0
                this.addButtonDialogVisible = true
            },
            // 添加子标签
            append(node, data) {
                if (node.level >= this.nodeMaxDepth) {
                    // 超过最大深度
                    this.$message.error(`添加失败！标签树最大级数为${this.nodeMaxDepth}级`);
                } else {
                    // 未超过最大深度
                    const newChild = { id: id++, categoryName: 'testtest', children: [] };
                    if (!data.children) {
                        this.$set(data, 'children', []);
                    }
                    data.children.push(newChild);
                    // 初始化值
                    this.addCategoryParentId = data.categoryId
                    this.addButtonDialogVisible = true
                }
            },
            // 修改addButtonDialogVisible状态
            addButtonDialogClose() {
                this.addButtonDialogVisible = false
            },
            // 初始化 从页面读取数据
            getCategory() {
                getCategory().then(res => {
                    // 数据清洗
                    this.data = res.data.data.map(item => {
                        let children = item.subCategory
                        children = children.map(item2 => {
                            return {
                                categoryId: item2.categoryId,
                                categoryName: item2.categoryName,
                                sort: item2.sort,
                                parentCategoryId: item2.parentCategoryId,
                            }
                        })
                        return {
                            categoryId: item.categoryId,
                            categoryName: item.categoryName,
                            sort: item.sort,
                            parentCategoryId: item.parentCategoryId,
                            children,
                        }
                    })
                })
            },
            // 页面刷新
            refresh() {
                this.$options.methods.getCategory()
            },
            remove(node, data) {
                console.log(data);
                console.log(node);
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            handleDragStart(node, ev) {

                // console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                // console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                // console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                // console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                // console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                // console.log('tree drop: ', dropNode.label, dropType);
            },
            allowDrop(draggingNode, dropNode, type) {
                const draggingNodeDepth = getMaxDepth(draggingNode)
                const dropNodeDepth = getMaxDepth(dropNode)
                const maxDepth = Math.max(dropNodeDepth, draggingNodeDepth)
                const sum = maxDepth + dropNode.level
                // 限制最大深度为nodeMaxDepth
                if (type === "inner") {
                    if (sum > this.nodeMaxDepth) {
                        this.errorMessageAlert()
                        return false
                    }
                } else {
                    if ((sum - 1) > this.nodeMaxDepth) {
                        return false
                    }
                }
                return true
            },
        },
        components: {
            CategoryAddButtonDialog
        }
    }
</script>
<style scoped>
    /* 修改树形控件基础样式 */
    .block>>>.el-tree-node__content {
        position: relative;
        height: 60px !important;
    }

    .block>>>.el-tree-node__content::after {
        content: '';
        position: absolute;
        background-color: #EBEEF5;
        z-index: 1;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
    }

    /* 树形表格 */
    .categoryTree {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid rgb(0 0 0 / 6%);
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    }

    .custom-tree-node>span:nth-child(2) {
        padding-left: 200px;
    }

    .categoryButton {
        padding: 0 20px;
        color: #70b3f5;
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 150px;
    }
</style>