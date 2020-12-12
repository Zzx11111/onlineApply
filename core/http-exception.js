const { times, toPairsIn } = require("lodash")


class HttpException extends Error{
  constructor(msg = '服务器异常', errorCode = 10000, code = 400){
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400
  }
}

class AuthFailed extends HttpException{
  constructor(msg = '验证失败',errorCode = 10001){
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 401
  }
}

class Forbidden extends HttpException{
  constructor(msg = '禁止访问',errorCode = 10002){
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 403
  }
}

module.exports = {
  HttpException,
  ParameterException,
  AuthFailed,
  Forbidden
}