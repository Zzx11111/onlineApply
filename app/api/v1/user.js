const Router = require('koa-router')
const {HttpException} = require('../../../core/http-exception')
const {LoginValidator,updateInfoValidator,deleteUserValidator} = require('../../validators/validator')
const User = require('../../models/user')
const Activity = require('../../models/activity')
const Enlist = require('../../models/enlist')
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
//发布的活动
router.get('/myRelease',new Auth().m,async(ctx,next) => {
  const id = ctx.auth.id
  console.log(id);
  const activity = await Activity.getMyRelease(id)
  for(let i = 0;i<activity.length;i++){
    const promoter = await User.getUserInfo(activity[i].uid)
    //发起人的用户名和头像
    activity[i].dataValues.promoter = promoter 
    const applyNum = await Enlist.applyNum(activity[i].id)
    activity[i].dataValues.applyNum = applyNum
  }
  ctx.body = activity
})
//报名过的活动
router.get('/myEnlist',new Auth().m,async(ctx,next) => {
  const id = ctx.auth.id
  const aids = await Enlist.getUserEnlistActivity(id)
  console.log(aids)
  const activity = await Activity.activityInfo(aids)
  for(let i = 0;i<activity.length;i++){
    const promoter = await User.getUserInfo(activity[i].uid)
    //发起人的用户名和头像
    activity[i].dataValues.promoter = promoter 
    const applyNum = await Enlist.applyNum(activity[i].id)
    activity[i].dataValues.applyNum = applyNum
  }
  console.log(activity);
  ctx.body = activity
})
//个人信息
router.get('/info',new Auth().m,async(ctx,next) => {
  const id = ctx.auth.id
  const userInfo = await User.getUserInfo(id)
  ctx.body = {
    id:userInfo.uid,
    name:userInfo.name,
    phone:userInfo.phone
  }
})

router.get('/getUserList',new Auth().m,async(ctx,next) => {
  const userList = await User.getUserList()
  ctx.body = userList
})

router.post('/deleteUser',new Auth().m,async (ctx,next) => {
  const v = await new deleteUserValidator().validate(ctx)
  const id = v.get('body.id')
  const data = await User.deleteUser(id)
  console.log(data);
  if(data === true){
    ctx.body = {
      msg:'删除成功',
      errorCode:0
    }
  }
})




module.exports = router