// ajax名字是可以改的。它的格式与 axios()的格式是一样的

import ajax from '../utils/request.js'
// import { getUser } from '../utils/storage.js'
export const userLogin = (mobile, code) => {
  // 返回promise对象
  return ajax({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile: mobile,
      code: code
    }
  })
}
// 获取用户身份信息
export const userGetProfile = () => {
  // 返回promise对象
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  // const userInfo = getUser()
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // headers: {
    // // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjE2NDgwMTMsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.9nDEYT2H0QE5wXzrzx9lvw_svtqgfbv_JscOBtyXUfo'
    //   Authorization: `Bearer ${userInfo.token}`
    // }
  })
}
