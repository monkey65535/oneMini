const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')


class OneArtical extends Model {
    static async insertArrsHome(data) {
        if (data && data.length) {
            for (let i = 0; i < data.length; i++) {
                await this.insertTo(data[i])
            }
        }
    }

    static async insertTo(one) {
        try {
            // 首先查询数据库中是否有对应的vol_num
            const once = await this.findAll({
                where: {
                    vol_num: one.vol_num
                }
            })
            if (once && once.length) {
                return false;
            }
            this.create({
                ...one
            })
        } catch (e) {
            console.log(e);
        }
    }
}

OneArtical.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true, // 设置主键
            autoIncrement: true, // 设置自增
            comment: "用户id"
        },
        title: {
            type: Sequelize.STRING,
            comment: "文章标题"
        },
        vol_num: {
            type: Sequelize.INTEGER,
            unique: true,  // 期刊id  唯一
            comment: "第几期"
        },
        author: {
            type: Sequelize.STRING(32),
            comment: "文章作者"
        },
        href: {
            type: Sequelize.STRING,
            comment: "文章链接"
        }
    },
    {
        sequelize,
        tableName: 'one_artical'
    })


module.exports = {
    OneArtical
}
