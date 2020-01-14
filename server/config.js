module.exports = {
    // 开发环境 dev 生产环境 prod
    environment: process.env.NODE_ENV,
    appkey: "DJKng2Ln0ZgNItbt",
    port: '3003',
    database: {
        host: '122.51.231.49',
        user: 'root',
        password: 'Pass@1234',
        port: '3306',
        dbName: 'oneMini'
    },
    security: {
        secretKey: "1qaz@wsx",
        expiresIn: 60 * 60 * 24 * 30 // 过期时间 1个小时
    },
    wx: {
        appID: 'wx3a5c36291f3aac7f',
        appSecret: '251a6b6aafb05959d02f395c5a7dda96',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu: {
        detailUrl: 'http://t.yushu.im/v2/book/id/%s',
        keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host: 'http://localhost:3000/'
}
