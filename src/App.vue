<template>
  <div id="app">
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
    name: 'App',
    components: {
      TopBar,
      LeftBar,
      Main
    }
  }
</script>

<style>
  @import './assets/css/base.css';

  .header {
    background-color: cornflowerblue;
    height: 70px !important;
  }

  .aside {
    background-color: darkgray;
    width: 250px !important;
  }

  .main {
    background-color: darkorchid;
  }
</style>