const Router = require('koa-router')
const querystring = require('querystring')
const router = new Router({
    prefix: "/api/classic"
});

const {OneHome} = require('../models/OneHome')
const {Favor} = require('../models/Favor')
const {NoData} = require('../../core/httpException')
const {Auth} = require('../../middleware/Auth')

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
                },
                attributes: ["id", "type", "imgUrl", "vol_num", "day", "may", "type", "sentence"]
            })
            console.log(res);
            if (!res) {
                throw new NoData("数据查询为空")
            }
            classicRes = res;

        }
    } else {
        const res = await OneHome.findOne({
            order: [['vol_num', 'DESC']],     // 倒序排序
            attributes: ["id", "type", "imgUrl", "vol_num", "day", "may", "type", "sentence"]
        })
        if (!res) {
            throw new NoData("数据查询为空")
        }
        classicRes = res;
    }

    ctx.body = classicRes;
})

router.post('/like', async (ctx, next) => {

})

module.exports = router;
