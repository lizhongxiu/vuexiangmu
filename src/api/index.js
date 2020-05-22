// ajax名字是可以改的。它的格式与 axios()的格式是一样的

import ajax from '../utils/request.js'
export const userLogin = (mobile, code) => {
  return ajax({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile: mobile,
      code: code
    }
  })
}
