// pages/my/my.js
import {
  getUserInfo,
  login,
  getUserToken
} from '../../utils/login'
const APP = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "",
      city: "",
      country: "",
      gender: "",
      language: "",
      nickName: "",
      province: "",
    },
    authorized: false,
    userImg: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onGetUserInfo(event) {
    console.log('click')
    login()
      .then(res => {
        if (res.errMsg === "login:ok") {
          console.log(res.code);
          return getUserToken(res.code)

        } else {
          return Promise.reject("登陆失败")
        }
      })
      .then(res => {
        return getUserInfo()
      })
      .then(res => {
        if (res.errMsg === "getUserInfo:ok") {
          this.setData({
            userInfo: {
              ...res.userInfo
            },
            authorized: true
          })
        }
        console.log(res, 'getuserINfo');
      })
  }
})