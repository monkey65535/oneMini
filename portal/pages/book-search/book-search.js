// pages/book-search/book-search.js
import {
  serachBook
} from '../../api/Book.js'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

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
    },
    showTags: true,
    showLoading: false,
    historyList: [],
    searchQ: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistoryList();
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
    console.log(1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getHistoryList() {
    const historyList = wx.getStorage({
      key: 'bookHistory',
      success: (res) => {
        const {
          data
        } = res;
        if (data) {
          const list = JSON.parse(data)
          this.setData({
            historyList: list
          })
        }
      },
      fail: (err) => {
        console.log(err, 'FAILED');
      }
    })
  },
  setHistoryList(name) {
    const baseList = this.data.historyList;
    if (baseList.indexOf(name) > 0) return
    baseList.push(name)
    this.setData({
      historyList: baseList
    })
    wx.setStorage({
      key: 'bookHistory',
      data: JSON.stringify(baseList),
    })
  },
  handleBack(event) {
    wx.navigateBack({})
  },
  searchBook(event) {
    this.initBook();
    let value = event.detail.value;
    if (value) {
      value = value.trim()
      this.xhrSearchBook(value)
      this.setHistoryList(value)
    }
  },
  xhrSearchBook(bookname) {
    const {
      bookList,
      start,
      count,
      summary
    } = this.data.bookData
    this.setData({
      showLoading: true,
      showTags: false
    })
    Toast.loading({
      mask: true,
      message: '加载中...'
    });
    serachBook(bookname, start, count, summary)
      .then(res => {
        this.setData({
          showLoading: false
        })
        Toast.clear();
        this.setData({
          bookData: {
            bookList: [...bookList, ...res.books],
            count: 20,
            start: this.data.bookData.start + this.data.bookData.count,
            summary: 1,
            total: res.total
          }
        })
      })
  },
  clickToSearch(event) {
    let {
      search
    } = event.currentTarget.dataset
    search = search.trim()
    if (search) {
      this.setData({
        searchQ: search
      })
      this.initBook();
      this.xhrSearchBook(search)
    }
  },
  initBook() {
    this.setData({
      bookData: {
        ...this.data.initBookData
      }
    })
  },
  clearInp(event) {
    this.setData({
      showTags: true,
      searchQ: ""
    })
    this.initBook()
  }
})