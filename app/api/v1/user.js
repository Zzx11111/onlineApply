const Router = require('koa-router')
const {HttpException} = require('../../../core/http-exception')
const {LoginValidator} = require('../../validators/validator')
const User = require('../../models/user')
const router = new Router({
  prefix:'/v1/user'
})

router.post('/login',async(ctx,next) => {
  const v = await new LoginValidator().validate(ctx)
  console.log(v.get('body.code'))
  await User.wxLogin(v.get('body.code'))
  ctx.body = 1
})


module.exports = router