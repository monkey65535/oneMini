const Router = require('koa-router')
const querystring = require('querystring')
const router = new Router({
    prefix: "/api/classic"
});
const {OneHome} = require('../models/OneHome')

const {NoData} = require('../../core/httpException')

// 获取最新一期期刊封面(id最大的)  如果携带参数,那么是获取对应一期的期刊封面
router.get('/', async (ctx, next) => {
    let classicRes = null
    if (ctx.querystring) {
        let {id} = querystring.decode(ctx.querystring)
        if (id) {
            // id = parseInt(id)
            const res = await OneHome.findOne({
                where: {
                    id
                }
            })
            if (!res) {
                throw new NoData("数据查询为空")
            }
            classicRes = res;

        }
    } else {
        const res = await OneHome.findOne({
            order: [['id', 'DESC']]      // 倒序排序
        })
        if (!res) {
            throw new NoData("数据查询为空")
        }
        classicRes = res;
    }

    ctx.body = classicRes;
})

module.exports = router;
