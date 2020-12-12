const Router = require('koa-router')
const {HttpException} = require('../../../core/http-exception')
const {LoginValidator} = require('../../validators/validator')
const User = require('../../models/user')
const {Auth} = require('../../../middleware/auth')
const {generateToken} = require('../../../core/utils')

const router = new Router({
  prefix:'/v1/user'
})

router.post('/login',async(ctx,next) => {
  console.log(ctx.header)
  const v = await new LoginValidator().validate(ctx)
  console.log(v.get('body.code'))
  const user = await User.wxLogin(v.get('body.code'))
  const token = await generateToken(user.id)
  
  ctx.body = {
    id:user.id,
    token:token
  }
})

router.get('/c',async (ctx) => {
  ctx.body = {
    a:'ssssss'
  }
})
router.get('/info',new Auth().m,async(ctx,next) => {
  ctx.body = {
    id:ctx.auth.id
  }
})




module.exports = router