const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const {security} = require('../config')
const {Forbbiden} = require('../core/httpException')


class Auth {
    constructor() {
    }

    get Token() {
        return async (ctx, next) => {
            // 验证token
            const userToken = basicAuth(ctx.req)
            let errMsg = 'token不合法'
            // 获取失败 返回forbidden
            if (!userToken || !userToken.name) {
                throw new Forbbiden("TOKEN获取失败")
            }
            // 验证token,如果过期返回token过期
            try {
                console.log(security.secretKey, 'security.secretKey');
                let decode = jwt.verify(userToken.name, security.secretKey)
                ctx.token = decode
                await next()
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new Forbbiden(errMsg)
            }

        }
    }

    static async createToken(uid, openid) {
        // 生成token
        if (!uid || !openid) {
            throw new Error(`uid ${uid} openid ${openid} 参数错误`)
        }
        const token = jwt.sign({
            uid, openid
        }, security.secretKey, {
            expiresIn: security.expiresIn
        })
        return token;
    }
}


module.exports = {
    Auth
}
