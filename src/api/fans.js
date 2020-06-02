import ajax from '../utils/request'
// eslint-disable-next-line camelcase
export const getFans = (page, per_page) => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params: {
      page,
      per_page
    }
  })
}
export const getFansStatistics = () => {
  return ajax({
    method: 'GET',
    url: '/mp/v1_0/statistics/followers'
  })
}
