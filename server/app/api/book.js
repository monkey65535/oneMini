const Router = require('koa-router')
const axios = require('axios')
const router = new Router({
    prefix: "/api/book"
});

const {HotBook} = require('../models/HotBook')

// 获取热门书籍
router.get('/hotbook', async (ctx, next) => {
    const res = await HotBook.findAll({
        order: [['index', 'ASC']]
    })
    console.log(res);
    ctx.body = res
})

// 搜索获取数据
router.post('/search', async (ctx, next) => {
    const {bookname, start, count, summary} = ctx.request.body;
    const res = await HotBook.search(bookname, start, count, summary)
    ctx.body = res;
})
// 获取书籍详情
router.get('/bookdetail/:id', async (ctx, next) => {

})


module.exports = router
