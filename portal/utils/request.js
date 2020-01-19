// const {
//   HTTPUrl
// } = require('./config.js')
import {
  HTTPUrl
} from './config.js'

import {
  Base64
} from 'js-base64'

const tips = {
  1: '抱歉，出现了一个错误',
  3000: '期刊不存在'
}

// 统一进行错误处理,传入上方标签
function show_error(error_code) {
  if (!error_code) {
    error_code = 1
  }
  const tip = tips[error_code]
  wx.showToast({
    title: tip ? tip : tips[1],
    icon: 'none',
    duration: 2000
  })
}


function _encodeToken() {
  const token = wx.getStorageSync('token')
  if (token) {
    const base64 = Base64.encode(token + ':')
    // 格式：Authorization: Basic $(base64_encode({username}:{password})) 
    return 'Basic ' + base64
  } else {
    return null
  }
}

export function HTTPRequest({
  method,
  url,
  params
}) {
  //封装AJAX请求
  return new Promise((reslove, reject) => {
    wx.request({
      url: `${HTTPUrl}/${url}`,
      data: params,
      header: {
        'content-type': 'application/json',
        'Authorization': _encodeToken()
      },
      method: method,
      success: function (res) {
        reslove(res.data)
      },
      fail: function (res) {
        // 统一进行错误处理
        show_error(1)
        reject(res)
      }
    })
  })
}

// module.exports = {
//   HTTPRequest
// }