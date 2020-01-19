const Router = require('koa-router')
const router = new Router({
    prefix: "/api/user"
})
const {User} = require('../models/User')
const {WX} = require('../services/wx')
const {ParameterError} = require('../../core/httpException')
const {Auth} = require('../../middleware/Auth')


router.post('/token', async (ctx, next) => {
    const {code} = ctx.request.body
    if (!code) {
        throw new ParameterError("code获取错误")
    }
    const {openid} = await WX.codeToToken(code);
    // 查询数据库,判断有没有openid,如果有直接生成token返回,如果没有那么在库中存入用户信息在返回
    const isCreated = User.findOne({
        where: {
            openid
        }
    })
    let uid;
    if (!isCreated) {
        // 存库
        const createUser = User.create({

        })
    } else {
        uid = isCreated.id
    }
    // 生成token并返回

    const token = await Auth.createToken(openid)
    ctx.body = {
        code: 200,
        openid
    }
})


module.exports = router
