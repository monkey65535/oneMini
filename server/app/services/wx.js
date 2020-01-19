const util = require('util')
const axios = require('axios')
const {wx} = require('../../config')
const {loginUrl, appID, appSecret} = wx;
const {AuthFailed} = require('../../core/httpException')

class WX {
    static async codeToToken(code) {
        const URL = util.format(loginUrl, appID, appSecret, code)
        const result = await axios(URL)
        // 解析openId 错误
        if (result.status !== 200) {
            throw new AuthFailed()
        }
        console.log(result)
        const {data} = result
        const {errcode, errmes} = data
        // 返回了错误信息
        if (errcode && errcode !== 0) {
            throw new AuthFailed(`${errcode} ${errmes}`)
        }
        // 返回openID和生成的token
        return {
            openid: data.openid,
        }
    }
}

module.exports = {
    WX
}
