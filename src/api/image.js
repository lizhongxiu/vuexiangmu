
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
/**
 * 删除图片
 * @param {number} id 图片编号
 */
export const delImage = id => {
  return ajax({
    method: 'DELETE',
    url: '/mp/v1_0/user/images/' + id
  })
}
/**
 * 修改图片
 */
export const modImage = (id, data) => {
  return ajax({
    method: 'PUT',
    url: '/mp/v1_0/user/images/' + id,
    data
  })
}
