import {
  HTTPRequest
} from '../utils/request.js'

export function getArticleList() {
  return HTTPRequest({
    method: 'GET',
    url: "api/article/"
  })
}

export function getArticleInfo(type, id) {
  if (!type || !id) {
    return Promise.reject({
      msg: '参数错误'
    });
  } else {
    return HTTPRequest({
      method: "GET",
      url: `api/article/info/${type}/${id}`
    })
  }
}