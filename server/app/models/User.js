const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')


// 小程序

class User extends Model {
}


User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // 设置主键
        autoIncrement: true, // 设置自增
        comment: "用户id"
    },
    nick_name: {
        type: Sequelize.STRING,
        comment: "用户名"
    },
    gender: {
        type: Sequelize.INTEGER,
        comment: "用户性别"
    },
    avatar_url: {
        type: Sequelize.STRING,
        comment: "用户头像"
    },
    openid: {
        type: Sequelize.STRING(64),
        comment: "微信openID",
        unique: true // 设置唯一值
    },

}, {
    sequelize,
    tableName: 'user'
})


module.exports = {
    User
}
