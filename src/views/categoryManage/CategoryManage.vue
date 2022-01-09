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
                    <i class="el-icon-zoom-in categoryButton" @click="() => edit(node, data)">编辑</i>
                </span>
            </div>
        </el-tree>
        </el-alert>
        <CategoryAddAndEditButtonDialog :parentCategoryId="addCategoryParentId" :formData="formData"
            :dialogType="dialogType" :dialogVisible="addAndEditButtonDialogVisible"
            @addAndEditButtonDialogClose="addAndEditButtonDialogClose" @refresh="refresh">
        </CategoryAddAndEditButtonDialog>
    </div>
</template>
<script>
    import CategoryAddAndEditButtonDialog from './CategoryAddAndEditButtonDialog'

    import { getMaxDepth, throttle } from 'common/utils'
    import { getCategory, deleteCategory } from 'network/category'

    let id = 1000;
    export default {
        name: 'CategoryManage',
        data() {
            return {
                data: [],
                nodeMaxDepth: 2, // 树形节点最大深度
                isAllExpand: false, // 是否全部展开
                errorMessageAlert: null,
                addAndEditButtonDialogVisible: false, // 是否显示添加按钮对话框
                addCategoryParentId: 0, // 添加按钮传给对话框的父标签id,
                dialogType: '添加', // 对话框类型
                formData: {
                    categoryId: 0
                }
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
                // 初始化
                this.addCategoryParentId = 0
                this.dialogType = '添加'
                // 打开添加按钮对话框
                this.addAndEditButtonDialogVisible = true
            },
            // 添加子标签
            append(node, data) {
                if (node.level >= this.nodeMaxDepth) {
                    // 超过最大深度
                    this.$message.error(`添加失败！标签树最大级数为${this.nodeMaxDepth}级`);
                } else {
                    // 初始化值
                    this.dialogType = '添加'
                    this.addCategoryParentId = data.categoryId
                    this.addAndEditButtonDialogVisible = true
                }
            },
            // 添加按钮对话框已关闭
            addAndEditButtonDialogClose() {
                this.addAndEditButtonDialogVisible = false
            },
            // 从数据库中读取数据
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
                console.log("刷新");
                setTimeout(() => {
                    this.getCategory()
                }, 600)
            },
            // 删除分类
            remove(node, data) {
                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteCategory(data.categoryId).then(res => {
                        if (res.data.status === 0) {
                            // 页面刷新
                            this.refresh()
                            // 消息提示
                            this.$message({
                                type: 'success',
                                message: '删除分类成功!'
                            });
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除分类'
                    });
                });
            },
            // 编辑分类
            edit(node, data) {
                // 数据清洗
                delete data['children']
                // 初始化
                this.formData = data
                this.addCategoryParentId = data.categoryId
                this.dialogType = '修改'
                // 打开编辑按钮对话框
                this.addAndEditButtonDialogVisible = true
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
            CategoryAddAndEditButtonDialog
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