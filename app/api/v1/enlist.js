const Router = require('koa-router')
const Activity = require('../../models/activity')
const User = require('../../models/user')
const Enlist = require('../../models/enlist')
const {activityEnlistValidator} = require('../../validators/validator')
const {Auth} = require('../../../middleware/auth');
const router = new Router({
  prefix:'/v1/Enlist'
})


router.post('/activityEnlist',new Auth().m,async (ctx,next)=>{
  const v = await new activityEnlistValidator().validate(ctx)
  const uid = ctx.auth.id
  const aid = v.get("body.aid")
  const name = v.get("body.name")
  const phone = v.get("body.phone")
  console.log(uid);
  const row = await Enlist.activityEnlist(uid,aid,name,phone)
  
  ctx.body ={
    msg:"报名成功",
    status:201,
    errorCode:0
  }
})


module.exports = router