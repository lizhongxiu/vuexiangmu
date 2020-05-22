<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// 1. 导入封装好的模块 ajax这个名字是可以改换
import ajax from './utils/request'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    hTest () {
      console.log(1)
      // 2. 测试使用
      ajax({
        method: 'GET',
        url: '/mp'
      })
    }
  }
}
</script>
