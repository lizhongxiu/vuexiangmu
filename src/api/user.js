// ajax名字是可以改的。它的格式与 axios()的格式是一样的

import ajax from '../utils/request.js'
// 获取用户信息
export const getUserProfile = () => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
  })
}
export const modUserProfile = data => {
  return ajax({
    method: 'patch',
    url: '/mp/v1_0/user/profile',
    data
  })
}
export const modUserImage = (formData) => {
  return ajax({
    method: 'patch',
    url: '/mp/v1_0/user/photo',
    data: formData
  })
}
