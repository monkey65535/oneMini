// 封装错误处理的基类
class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super();
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

class Forbbiden extends HttpException {
    constructor(msg = '禁止访问', errorCode = 10006) {
        super()
        this.code = 403;
        this.msg = msg;
        this.errorCode = errorCode;
    }

}

class AuthFailed extends HttpException {
    constructor(msg = '授权失败', errorCode = 10004) {
        super();
        this.code = 401;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}

module.exports = {
    HttpException,
    Forbbiden,
    AuthFailed
}