import ajax from '../utils/request'
export const getArticles = (queryObj) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: queryObj
  })
}
export const getArticleChannels = () => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
export const deleteArticle = articleId => {
  return ajax({
    method: 'DELETE',
    url: '/mp/v1_0/articles/' + articleId
  })
}
