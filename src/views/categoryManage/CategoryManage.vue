<template>
    <div class="block">
        <p>使用 scoped slot</p>
        <el-button type="primary" @click="rootAppend">添加根结点</el-button>
        <el-tree :data="data" default-expand-all @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd"
            @node-drop="handleDrop" draggable :allow-drop="allowDrop" :allow-drag="allowDrag"
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button type="text" size="mini" @click="() => append(data)">
                        Append
                    </el-button>
                    <el-button type="text" size="mini" @click="() => remove(node, data)">
                        Delete
                    </el-button>
                </span>
            </span>
        </el-tree>
        {{data}}
    </div>
</template>
<script>
    import { getMaxDepth } from 'common/utils'
    let id = 1000;
    export default {
        name: 'CategoryManage',
        data() {
            const data = [{
                id: 1,
                label: '一级 1',
                children: []
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }];
            return {
                data: JSON.parse(JSON.stringify(data)),
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
            // jiShu(node) {
            //     if(!node) {
            //         return 0
            //     }
            //     let maxDepth = 0
            //     const childNodes = node.childNodes
            //     for(const childNode of childNodes) {
            //         const childNodeMaxDepth = this.$options.methods.jiShu(childNode)
            //         maxDepth = Math.max(maxDepth,childNodeMaxDepth)
            //     }
            //     return maxDepth + 1
            // },
            rootAppend() {
                console.log(this.data);
                const newChild = {
                    id: id++,
                    label: 'testtest',
                    children: []
                }
                this.data.push(newChild)
            },
            append(data) {
                console.log(data);
                const newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
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
                // if(dropNode.level >= 3) {
                //     console.log('求怕累');
                // }

                // console.log(dropNode);
                // console.log(ev);
                // console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                // console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                // console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log(ev);

                // this.canDraggable = true
                // console.log('已修改为可拖拽');
                // console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                // console.log('tree drop: ', dropNode.label, dropType);
                // this.canDraggable = true
                // console.log('已修改为可拖拽');
            },
            allowDrop(draggingNode, dropNode, type) {
                console.log('-----------------------------');
                console.log('被拖拽的节点：', draggingNode.data.label);
                console.log(draggingNode);
                console.log('准备进入的节点:', dropNode.data.label);
                console.log(dropNode);
                const draggingNodeDepth = getMaxDepth(draggingNode)
                const dropNodeDepth = getMaxDepth(dropNode)
                console.log('被拖拽的节点 最大深度：', draggingNodeDepth);
                console.log('准备进入的节点 最大深度：', dropNodeDepth);
                const maxDepth = Math.max(dropNodeDepth, draggingNodeDepth)
                if ((maxDepth + dropNode.level) > 3) {
                    console.log('已修改为不可拖拽');
                    console.log('-----------------------------');
                    return false
                }

                return true

                // if (dropNode.data.label === '二级 3-1') {
                //     return type !== 'inner';
                // } else {
                //     return true;
                // }
            },
            allowDrag(draggingNode) {
                return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
            }
        },
    }
</script>
<style scoped>

</style>