const {HttpException} = require('../core/httpException')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        // 如果是主动抛出的错误,那么是继承于HTTPEXCEPTION类的
        const isHttpException = error instanceof HttpException
        const isDev = process.env.NODE_ENV === 'dev'

        if (isDev && !isHttpException) {
            throw error;
        }

        if (isHttpException) {
            // 这里是代码主动抛出的错误
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.mathod}  ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                msg: '出现了一个错误~',
                error_code: 99999,
                request: `${ctx.mathod}  ${ctx.path}`
            }
            ctx.status = 500;
        }
    }
}


module.exports = catchError;
