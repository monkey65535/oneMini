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
        const oneDay = 1000 * 60 * 60 * 24;
        this.loadHttpExpection()
        this.initLoadRouters();
        this.loadOneToDataBases()
        // await this.loadOneToDataBases()
        setInterval( async() => {
            await this.loadOneToDataBases()
        },oneDay)
        
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
