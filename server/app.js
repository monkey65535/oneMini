const KOA = require('koa')
const bodyParser = require('koa-bodyparser')


const {
    port
} = require('./config')

const app = new KOA()
app.use(bodyParser())

app.listen(port, () => {
    console.log(`app is running at port ${port}`)
})