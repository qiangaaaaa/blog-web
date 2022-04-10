# 个人博客后台管理系统

## 当前任务清单
+ 进入文章添加、修改dialog后，dialog根据标签id、分类id拿到对应的名。
+ 文章添加、修改时，添加标签逻辑。
  1. 拿到所有标签，随机取3个标签预置。
  2. 新增标签如果不存在，则新增标签，放入表单中。如果存在，则根据标签名获取相应ID，放入表单。

## 当前思路与问题
文章编辑、添加按钮组件
1. 编辑、添加按钮。
2. 只有一个文章发布，不要草稿功能。
3. 文章分类，标签，哪个需要读取否需要有库？哪个添加？如何设置？

## 开发约定
+ 删除按钮
    + 有文本内容：默认样式circle。
    + 无文本内容：默认样式round

## 目前已装依赖
+ vue-router
+ element-ui
+ axios
+ mavon-editor
+ scp2（打包自动化部署）

## 项目亮点
+ 搜索框实时查询（防抖）、分类管理错误提示（节流）---性能优化
+ 组件的封装（删除按钮和模态框联合封装，编辑按钮和表单联合封装）---降低耦合度
+ 树形结构
    + 可拖动
    + 可限制拖动范围
    + 相关警告提醒节流处理。
    + N叉树最大深度算法

## 项目初始化
```
npm install
```

## 项目启动
```
npm run serve
```


