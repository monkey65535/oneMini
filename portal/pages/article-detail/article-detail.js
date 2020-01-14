// pages/article-detail/article-detail.js
import {
  getArticleInfo
} from '../../api/Article.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    richHTML: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    const {
      type,
      id
    } = options;

    // 获取页面数据
    getArticleInfo(type, id)
      .then(res => {
        if (res && res.success) {
          let str = res.data.html;
          str = str.replace(/width\s*:\s*[0-9]+px/g, 'width:100%');
          //替换center标签
          str = str.replace(/<([\/]?)(center)((:?\s*)(:?[^>]*)(:?\s*))>/g, '<$1div$3>');
          //正则给img标签增加class
          str = str.replace(/\<img/gi, '<img class="rich-img" ');
          //或者这样直接添加修改style
          str = str.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="width:100%;height:auto;display: block;margin:auto"');
          str = str.replace(/\<p/gi, '<P class="rich-p" ');
          this.setData({
            richHTML: str || ""
          })
        }
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

  }
})