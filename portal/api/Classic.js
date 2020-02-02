// const {
//   HTTPRequest
// } = require('../utils/request.js')

import {
  HTTPRequest
} from '../utils/request.js'
// 获取期刊首页
export function getClassic(vol_num) {
  let url = '';
	if (!vol_num) {
    url = "api/classic"
  } else {
		url = `api/classic?vol_num=${vol_num}`
  }
  return HTTPRequest({
    method: 'get',
    url: url
  })
}

// module.exports = {
//   getClassic
// }