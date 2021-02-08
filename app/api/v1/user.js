const Router = require('koa-router')
const {HttpException} = require('../../../core/http-exception')
const {LoginValidator} = require('../../validators/validator')
const User = require('../../models/user')
const {Auth} = require('../../../middleware/auth')
const {generateToken} = require('../../../core/utils')
const axios = require('axios')
const router = new Router({
  prefix:'/v1/user'
})

router.post('/login',async(ctx,next) => {
  // console.log(ctx.header)
  const v = await new LoginValidator().validate(ctx)
  const user = await User.wxLogin({
    code:v.get('body.code'),
    username:v.get('body.username'),
    avatarUrl:v.get('body.avatarUrl')
  })
  const token = await generateToken(user.id)
  
  ctx.body = {
    id:user.id,
    token:token
  }
})



router.get('/info',new Auth().m,async(ctx,next) => {
  ctx.body = {
    id:ctx.auth.id
  }
})




module.exports = router