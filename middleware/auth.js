const jwt = require('jsonwebtoken')
const {security} = require('../config/config')
const {Forbidden} = require('../core/http-exception')
class Auth {
  constructor(){

  }
  get m(){
    return async (ctx,next) => {
      const token = ctx.header.token
      if(!token){
        throw new Forbidden()
      }
      let decoded
      try {
        decoded = jwt.verify(token,security.secretKey)  
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          throw new Forbidden('token已经过期')
        }
        throw new Forbidden('token不合法')
      }
      ctx.auth = {
        id:decoded.uid
      }
      await next()
    }
  }
}


module.exports = {
  Auth
}