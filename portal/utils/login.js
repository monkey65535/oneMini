import {
  HTTPRequest
} from './request'

export function getUserInfo() {
  return new Promise((reslove, reject) => {
    wx.getUserInfo({
      success: (res) => {
        reslove(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
export function login() {
  return new Promise((reslove, reject) => {
    wx.login({
      success(res) {
        reslove(res);
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export function getUserToken(code) {
  return HTTPRequest({
    method: 'POST',
    url: "api/user/token",
    params: {
      code
    }
  })
}