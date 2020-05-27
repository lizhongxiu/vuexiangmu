import axios from 'axios'
import { getUser } from './storage'
import JSONbig from 'json-bigint'
// 创建axios的实例
// 可以写自己的配置项  http://www.axios-js.com/docs/#axios-create-config
const instance = axios.create({
  // 基地址：当前项目所有的接口都是以这个地址开头的
  baseURL: 'http://ttapi.research.itcast.cn/',
  // baseURL: 'http://api-toutiao-web.itheima.net/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log(err)
      return data
    }
  }]
})
// 请求拦截器
// 所有请求发出去之前会执行的函数，都会处理的逻辑。
instance.interceptors.request.use(function (config) {
  const userInfo = getUser()
  // Do something before request is sent
  // 在请求发出去之前做一些事
  // console.log('instance.interceptors.request', Date.now(), config)
  // 本次请求采用的配置
  // 补充一个headers参数Authorization
  if (userInfo && userInfo.token) {
    // 在这里给请求加上header，设置token
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 默认导出
export default instance
