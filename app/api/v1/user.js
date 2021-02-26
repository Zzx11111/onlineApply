const Router = require('koa-router')
const {HttpException} = require('../../../core/http-exception')
const {LoginValidator,updateInfoValidator} = require('../../validators/validator')
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

router.post('/updateInfo',new Auth().m,async (ctx,next)=> {
  const v = await new updateInfoValidator().validate(ctx)
  const id = ctx.auth.id
  const user = await User.updateInfo({
    id:id,
    name:v.get("body.name"),
    phone:v.get("body.phone")
  })
  //console.log(user);
  if(user){
    ctx.body = {
      msg:"修改成功",
      errorCode:0,
      code:200
    }
  }
  
})


router.get('/info',new Auth().m,async(ctx,next) => {
  ctx.body = {
    id:ctx.auth.id
  }
})




module.exports = router