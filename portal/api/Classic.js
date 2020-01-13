import {
  HTTPRequset
} from '../utils/request.js'


// 获取期刊首页
function getClassic(id) {
  const params = {}
  if (id) {
    params = {
      id
    }
  }
  return HTTPRequset({
    method: 'get',
    url: "/api/classic",
    params
  })
}



module.exports =  {
  getClassic
}