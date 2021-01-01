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
  const res = await axios({
    url:'http://10.101.88.52:8080/api/web/holdCurrency/query',
    method:'get',
    headers:{
      'Authorization':"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNCJ9.Xxo61kZDlkCG7o0s7ww7O19nIWTwEdXAUweuRrYnE6Y",
      'Content-Type': 'application/json;charset=UTF-8',
    }
  })
  console.log(res)
  ctx.body = {
    a:res.data
  }
})
router.get('/info',new Auth().m,async(ctx,next) => {
  ctx.body = {
    id:ctx.auth.id
  }
})




module.exports = router