// components/com-artaicl/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    article: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转页面
    toInfo() {
      const article = this.properties.article;
      wx.navigateTo({
        url: `/pages/article-detail/article-detail?type=${article.type}&id=${article.id}`
      })
    }
  },
  attached() {

  },

})