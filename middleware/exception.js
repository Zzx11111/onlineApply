/*
 * @全局异常处理
 */

const {HttpException} = require('../core/http-exception')
const {enviroment} = require('../config/config')
const catchError = async (ctx,next) => {
  try {
    await next()
  } catch (error) {
    //判断开发环境
    const isHttpException = error instanceof HttpException
    if(enviroment === 'dev' && !isHttpException){
      throw error
    }
    if(isHttpException){
      ctx.body = {
        msg:error.msg,
        errorCode:error.errorCode,
        request:`${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    }else{
      ctx.body = {
        msg:'未知异常',
        errorCode:999,
        request:`${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError