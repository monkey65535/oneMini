const Router = require('koa-router')
const router = new Router({
    prefix: "/api/article"
});
const {OneArtical} = require('../models/OneArtical')
const {OneQues} = require('../models/OneQuestions')

router.get('/', async (ctx, next) => {
    // 获取文章
    const articals = await OneArtical.findAll({
        attributes: ["id", "title", "vol_num", "author", "href",]
    })
    // 获取问答
    const ques = await OneQues.findAll({
        attributes: ["id", "title", "vol_num", "href",]
    })
    // 添加类型定义
    articals.forEach((item, index) => {
        item.setDataValue('type', 'art')
    })
    ques.forEach((item, index) => {
        item.setDataValue('type', 'ques')
    })
    // 排序
    const res = [...articals, ...ques];
    res.sort((a, b) => {
        return b.vol_num - a.vol_num
    })

    ctx.body = res;
})

router.get('/info/:type/:id', async (ctx, next) => {
})

module.exports = router
