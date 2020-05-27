
import ajax from '@/utils/request.js'

/**
  * 获取素材列表
  *
  * 参数名称 是否必须 示例 备注
  * collect    否   true 或 false 是否是收藏的图片
  * page      否 页数
  * per_page  否 每页数量
  */
export const getImages = (paramObj) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params: paramObj
  })
}
