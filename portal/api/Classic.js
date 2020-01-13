const {
  HTTPRequest
} = require('../utils/request.js')


// 获取期刊首页
function getClassic(id) {
  let url = '';
  if (!id) {
    url = "/api/classic"
  } else {
    url = `/api/classic?id=${id}`
  }
  return HTTPRequset({
    method: 'get',
    url: url
  })
}

module.exports = {
  getClassic
}