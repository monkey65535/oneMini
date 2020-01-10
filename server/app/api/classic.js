const Router = require('koa-router')
const router = new Router({
    prefix: "/api/classic"
});
router.get('/', async (ctx, next) => {
    ctx.body = 'HELLO MINI PRO'
})

module.exports = router;