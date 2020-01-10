const Router = require('koa-router')
const router = new Router({
    prefix: "/api/user"
})
const {User} = require('../models/User')
const {WX} = require('../services/wx')

router.post('/login', async (ctx, next) => {
    // 登陆 验证信息
    // 获取token
    // 返回token
})


module.exports = router
