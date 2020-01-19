const Router = require('koa-router')
const axios = require('axios')
const router = new Router({
    prefix: "/api/book"
});

const {HotBook} = require('../models/HotBook')
const {Favor} = require('../models/Favor')
const {ParameterError, NoData} = require('../../core/httpException')
const {Auth} = require('../../middleware/Auth')
// 获取热门书籍
router.get('/hotbook', async (ctx, next) => {
    const res = await HotBook.findAll({
        order: [['index', 'ASC']]
    })
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
    const {id} = ctx.params;
    if (!id) {
        throw new ParameterError('清传入书籍ID')
    }
    const res = await HotBook.getBookInfo(id);
    ctx.body = {
        code: 200,
        success: true,
        data: res
    };
})


router.post('/mybook', new Auth().Token, async (ctx, next) => {
    const {uid, openid} = ctx.token
    // 书籍的type是4
    const res = await Favor.findAll({
        where: {
            openid,
            type: 4,
            like: 1
        }
    })
    let resList = [];
    if (res && res.length) {
        const ids = res.map(item => item.art_id)
        // ajax查询数据并返回
        for (let i = 0; i < ids.length; i++) {
            const bookInfo = await HotBook.getBookInfo(ids[i]);
            resList.push(bookInfo)
        }
        resList = resList.map(book => ({
            author: book.author,
            id: book.id,
            image: book.image,
            title: book.title,
        }))
    }
    ctx.body = {
        code: 200,
        success: true,
        data: resList
    };

})

module.exports = router
