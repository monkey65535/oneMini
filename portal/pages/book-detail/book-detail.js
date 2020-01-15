// pages/book-detail/book-detail.js
import {
  getBookDetail
} from '../../api/Book'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTrigger: false,
    bookInfo: {
      author: "",
      binding: "",
      category: "",
      id: "",
      image: "",
      isbn: "",
      pages: "",
      price: "",
      pubdate: "",
      publisher: "",
      subtitle: "",
      summary: "",
      title: "",
      translator: [],
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    getBookDetail(options.id)
      .then(res => {
        console.log(res);
        if (res && res.code === 200) {
          this.setData({
            bookInfo: {
              ...res.data
            }
          })
        }
      })
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
  handleTriggerTags(event) {
    const isT = this.data.isTrigger
    this.setData({
      isTrigger: !isT
    })
  }
})