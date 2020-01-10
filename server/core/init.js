const requireDirectory = require('require-directory')
const path = require('path')
const Router = require('koa-router')

class Init {
    constructor(app) {
        this.app = app;
    }
    initCore() {
        this.initLoadRouters();
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
}

module.exports = Init;