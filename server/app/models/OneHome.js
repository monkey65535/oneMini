const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')


class OneHome extends Model {
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

OneHome.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true, // 设置主键
            autoIncrement: true, // 设置自增
            comment: "用户id"
        },
        imgUrl: {
            type: Sequelize.STRING,
            comment: "本期图片"
        },
        vol_num: {
            type: Sequelize.INTEGER,
            unique: true,  // 期刊id  唯一
            comment: "第几期"
        },
        day: {
            type: Sequelize.STRING(32),
            comment: "期刊日期"
        },
        may: {
            type: Sequelize.STRING(64),
            comment: "期刊年月"
        },
        type: {
            type: Sequelize.STRING(32),
            comment: "期刊图片类型"
        }
    },
    {
        sequelize,
        tableName: 'one_home'
    })


module.exports = {
    OneHome
}
