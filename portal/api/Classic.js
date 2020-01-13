// const {
//   HTTPRequest
// } = require('../utils/request.js')

import {
  HTTPRequest
} from '../utils/request.js'
// 获取期刊首页
export function getClassic(id) {
  let url = '';
  if (!id) {
    url = "api/classic"
  } else {
    url = `api/classic?id=${id}`
  }
  return HTTPRequest({
    method: 'get',
    url: url
  })
}

// module.exports = {
//   getClassic
// }