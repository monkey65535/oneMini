import {
  HTTPRequest
} from '../utils/request.js'

export function loveArticle() {
  return HTTPRequest({
    method: "get",
    url:""
  })
}