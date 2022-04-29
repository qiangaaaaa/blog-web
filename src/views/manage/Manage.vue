<template>
    <div id="manage">
        <el-container>
            <el-header class="header">
                <!-- 顶部 -->
                <top-bar></top-bar>
            </el-header>
            <el-container>
                <el-aside class="aside">
                    <!-- 左 侧边栏 -->
                    <left-bar></left-bar>
                </el-aside>
                <el-main class="main">
                    <!-- 主要内容区 -->
                    <Main></Main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import TopBar from 'components/content/topBar/TopBar'
    import LeftBar from 'components/content/leftBar/LeftBar'
    import Main from 'components/content/main/Main'
    export default {
        name: 'Manage',
        data() {
            return {
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
        },
        components: {
            TopBar,
            LeftBar,
            Main
        }
    }
</script>
<style scoped>
    @import '~assets/css/base.css';

    .header {
        background-color: cornflowerblue;
        height: 70px !important;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    }

    .aside {
        height: 100%;
        background-color: darkgray;
        width: 250px !important;
        overflow: inherit;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    }

    .main,
    .main>div {
        height: 100%;
    }
</style>