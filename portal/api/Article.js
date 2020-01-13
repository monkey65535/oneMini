import {
  HTTPRequest
} from '../utils/request.js'

export function getArticleList() {
  return HTTPRequest({
    method: 'GET',
    url: "api/article/"
  })
}