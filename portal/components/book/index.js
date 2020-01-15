// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: Object
  },
  attached() {

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
    handleClick(event) {
      console.log(this.properties.content);
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?id=${this.properties.content.id}`
      })
    }
  }
})