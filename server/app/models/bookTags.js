const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class BookTags extends Model {

}

BookTags.init({
    openid: {
        type: Sequelize.STRING,
        comment: "发布tag的用户openid"
    },
    content: {
        type: Sequelize.STRING,
        comment: "TAG"
    },
    book_id: {
        type: Sequelize.INTEGER,
        comment: "书籍的id"
    }
}, {sequelize, tableName: "book_tags"})

module.exports = {
    BookTags
}
