import ajax from '../utils/request'
export const getArticles = (queryObj) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: queryObj
  })
}
