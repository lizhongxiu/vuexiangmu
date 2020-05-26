<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <!-- <el-breadcrumb-item>内容管理</el-breadcrumb-item> -->
    <el-breadcrumb-item><slot></slot></el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
// 内容管理这几个字，应该能让用户自行传入的
// 解决方案：slot
// - 定义默认插槽：<slot></slot>
// - 使用插槽 <my-breadcrumb>发布文章/my-breadcrumb>
export default {
  name: 'MyBreadcrumb'
}
</script>
