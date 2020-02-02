// pages/classic/classic.js
// const {
//   getClassic
// } = require('../../api/Classic.js')
import {
  getClassic
} from '../../api/Classic.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData: {
      imgUrl: "",
      may: "-",
      day: "-",
      vol_num: "-",
      sentence: "-",
      type: "-",
      favor: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getClassic()
      .then(res => {
        this.setData({
          pageData: {
            ...res
          }
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 获取上一个封面 
  changeClassic(event) {
    const type = event.currentTarget.dataset.tap;
    if (!type) return false
    const currentId = this.data.pageData.vol_num;
    let sendId = currentId;
    if (type === 'prev') {
      sendId--
    } else {
      sendId++
    }
    getClassic(sendId)
      .then(res => {
        if (res && res.error_code !== 400) {
          this.setData({
            pageData: {
              ...res
            }
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
  },
  // 点击喜欢
  likeClassic() {
    console.log(this.data.pageData.id);
  }
})