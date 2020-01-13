// 封装错误处理的基类
class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super();
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
        this.success = false
    }
}

class Forbbiden extends HttpException {
    constructor(msg = '禁止访问', errorCode = 10006) {
        super()
        this.code = 403;
        this.msg = msg;
        this.errorCode = errorCode;
        this.success = false
    }

}

class AuthFailed extends HttpException {
    constructor(msg = '授权失败', errorCode = 10004) {
        super();
        this.code = 401;
        this.msg = msg;
        this.errorCode = errorCode;
        this.success = false
    }
}

class NoData extends HttpException {
    constructor(msg = '数据查询为空', errorCode = 400) {
        super();
        this.code = 400;
        this.msg = msg;
        this.errorCode = errorCode;
        this.success = false
    }
}


module.exports = {
    HttpException,
    Forbbiden,
    AuthFailed,
    NoData
}
