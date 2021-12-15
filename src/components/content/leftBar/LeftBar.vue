<template>
    <div class="left-bar">
        <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
            <div v-for="(item,i) in menuItem" :key="i">
                <div v-if="item.isHaveSon">
                    <el-submenu :index="item.path">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <el-menu-item v-for="(item2,j) in item.item" :key="j" :index="item2.path">
                            {{item2.name}}
                        </el-menu-item>
                    </el-submenu>
                </div>
                <div v-else>
                    <el-menu-item :index="item.path">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                </div>
            </div>
        </el-menu>
    </div>
</template>
<script>
    export default {
        name: 'LeftBar',
        data() {
            return {
                isCollapse: false,
                routePath: {
                    userManage: {
                        path: '/userManage'
                    },
                    manage: {
                        path: '/manage',
                    }
                },
                menuItem: [
                    {
                        isHaveSon: false,
                        path: '/userManage',
                        name: '用户管理UserManage',
                        icon: 'el-icon-user-solid',
                        item: []
                    },
                    {
                        isHaveSon: false,
                        path: '/manage',
                        name: '管理Manage',
                        icon: 'el-icon-s-help',
                        item: []
                    },
                    {
                        isHaveSon: true,
                        path: '/son1',
                        name: '父级菜单测试',
                        icon: 'el-icon-s-custom',
                        item: [
                            {
                                path: '/son1',
                                name: '儿子son1'
                            },
                            {
                                path: '/son2',
                                name: '儿子son2'
                            },
                            {
                                path: '/son3',
                                name: '儿子son3'
                            },
                        ]
                    },
                ]
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
    .left-bar {
    }
</style>