const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class Favor extends Model {

}

Favor.init({
    openid: {
        type: Sequelize.STRING,
        comment: "喜欢用户的openid"
    },
    type: {
        type: Sequelize.INTEGER,
        comment: "1 首页句子 2 问答 3  文章 4 书籍"
    },
    like: {
        type: Sequelize.INTEGER,
        comment: "喜欢:1 不喜欢:0"
    },
    art_id: {
        type: Sequelize.INTEGER,
        comment: "喜欢对象的id"
    }
}, {sequelize, tableName: "favor"})

module.exports = {
    Favor
}
