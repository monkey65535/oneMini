const requireDirectory = require('require-directory')
const path = require('path')
const Router = require('koa-router')
const {ArgentOneData} = require('../app/net/getOnePage')
const schedule = require('node-schedule');

class Init {
    constructor(app) {
        this.app = app;
    }

    async initCore() {
        this.loadHttpExpection()
        this.initLoadRouters();
        // todo 每天12:00 执行定时任务,抓取One数据
        schedule.cancelJob("0 0 12 * * *", async () => {
            await this.loadOneToDataBases();
            console.log(`获取数据, 时间为${new Date()}`)
        })
    }

    initLoadRouters() {
        const apiDirectory = path.join(process.cwd(), `/app/api`)
        // 递归加载全部路由
        requireDirectory(module, apiDirectory, {
            visit: route => {
                if (route instanceof Router) {
                    this.app.use(route.routes());
                }
            }
        })
    }

    loadHttpExpection() {
        const catchError = require('../middleware/exception')
        this.app.use(catchError)
    }

    async loadOneToDataBases() {
        const argentOneData = new ArgentOneData()
        await argentOneData.initNet()
    }
}

module.exports = Init;
