import ajax from '../utils/request'
// eslint-disable-next-line camelcase
export const getComments = (page, per_page) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: {
      page,
      per_page,
      response_type: 'comment'
    }
  })
}
/**
 * 打开或者关闭文章评论
 * @param {*} id 文章编号
 * @param {*} allow_comment 是否关闭
 */
// eslint-disable-next-line camelcase
export const modCommentStatus = (id, allow_comment) => {
  return ajax({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: id
    },
    data: {
      allow_comment
    }
  })
}
