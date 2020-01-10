const Router = require('koa-router')
const router = new Router({
    prefix: "/api/classic"
});
router.get('/', async (ctx, next) => {
    ctx.body = 'HELLO MINI PRO'
    // todo  访问接口 返回当前页信息和count, 如果携带要访问的id,那么返回对应id的信息和count
})

module.exports = router;
