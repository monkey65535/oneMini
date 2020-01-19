const Router = require('koa-router')
const superagent = require('superagent')
const cheerio = require('cheerio')
const router = new Router({
    prefix: "/api/article"
});
const {OneArtical} = require('../models/OneArtical')
const {OneQues} = require('../models/OneQuestions')
const {NoData} = require('../../core/httpException')

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
    const {type, id} = ctx.params;
    let Modle = null
    if (type === 'art') {
        Modle = OneArtical
    } else {
        Modle = OneQues
    }
    // 查询对应的数据
    const res = await Modle.findOne({
        where: {
            id
        }
    })
    if (!res) {
        throw new NoData()
    }
    // 从数据中拿到页面链接URL
    const URL = res.href;
    console.log(URL);
    // 抓取页面的内容
    const oneHomeRes = await superagent.get(URL)
    const $ = cheerio.load(oneHomeRes.text)
    let str = '';
    if (type === 'art') {
        str = $('.one-articulo').html()
    } else {
        str = $('.one-cuestion').html()
    }
    ctx.body = {
        code: 200,
        success: true,
        data: Object.assign({}, {
            html: str
        })
    };

})

module.exports = router
