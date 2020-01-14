// pages/book-search/book-search.js
import {
  serachBook
} from '../../api/Book.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookData: {
      bookList: [],
      count: 20,
      start: 0,
      summary: 1,
      total: 0
    },
    initBookData: {
      bookList: [],
      count: 20,
      start: 0,
      summary: 1,
      total: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  handleBack(event) {
    wx.navigateBack({})
  },
  searchBook() {
    this.initBook();
  },
  searchBookByGroup() {},
  xhrSearchBook(bookname) {
    const {
      start,
      count,
      summary
    } = this.data.bookData
    serachBook(bookname, start, count, summary)
      .then(res => {
        res.books
        this.setData({
          bookData: {
            bookList: this.data.bookData.bookList.concat(res.books),
            count: 20,
            start: this.data.bookData.start + this.data.bookData.count,
            summary: 1,
            total: res.total
          }
        })
      })
  },
  initBook() {
    this.setData({
      bookData: {
        ...this.data.initBook
      }
    })
  }
})