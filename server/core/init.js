const requireDirectory = require('require-directory')
const path = require('path')
const Router = require('koa-router')

class Init {
    constructor(app) {
        this.app = app;
    }
    static initCore() {
        this.initLoadRouters();
    }
    static initLoadRouters() {}
}

module.exports = {
    Init
};