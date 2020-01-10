const KOA = require('koa')
const bodyParser = require('koa-bodyparser')

const Init = require('./core/init')

const {
    port
} = require('./config')

const app = new KOA()
app.use(bodyParser())

new Init(app).initCore()
app.listen(port, () => {
    console.log(`app is running at port ${port}`)
})