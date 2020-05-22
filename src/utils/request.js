import axios from 'axios'

// 创建axios的实例
// 可以写自己的配置项  http://www.axios-js.com/docs/#axios-create-config
const instance = axios.create({
  // 基地址：当前项目所有的接口都是以这个地址开头的
  baseURL: 'http://api-toutiao-web.itheima.net/'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// 默认导出
export default instance
