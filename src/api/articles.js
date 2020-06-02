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
// article是一个对象，携带着请求时的参数
export const addArticle = (isDraft, article) => {
  return ajax({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft: isDraft
    },
    data: article
  })
}
export const getArticle = id => ajax({ method: 'GET', url: '/mp/v1_0/articles/' + id })
export const modeArticle = (id, data) => {
  return ajax({
    method: 'put',
    url: '/mp/v1_0/articles/' + id,
    params: {
      draft: false
    },
    data: data
  })
}
