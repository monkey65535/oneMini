const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const axios = require('axios')
const util = require('util')


const {ParameterError} = require('../../core/httpException')
const {yushu} = require('../../config')


class HotBook extends Model {
    /*
     *  查询接口,获取搜索内容
     * @params bookname {String} 搜索关键字
     * @params start {Number} 开始
     * @params count {Number} 长度
     * @params summary {Number}
     */
    static async search(bookname, start = 0, count = 20, summary = 1) {
        if (!bookname) {
            throw new ParameterError("搜索数据名不能为空")
        }
        const url = util.format(yushu.keywordUrl, encodeURI(bookname), count, start, summary)
        const result = await axios.get(url)
        return result.data
    }
}

HotBook.init({
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
}, {
    sequelize,
    tableName: 'hot_book'
})


module.exports = {
    HotBook
}
