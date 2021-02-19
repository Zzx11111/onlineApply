const Router = require('koa-router')
const { map } = require('lodash')
const Activity = require('../../models/activity')
const User = require('../../models/user')
const Enlist = require('../../models/enlist')
const {AddActivityValidator} = require('../../validators/validator')
const {ParameterException} = require('../../../core/http-exception');
const {Examine} = require('../../../middleware/examine');
const router = new Router({
  prefix:'/v1/activity'
})

router.get('/getActivity',async (ctx,next) => {
  const query = {}
  query.offset = ctx.request.query.offset
  query.limit = ctx.request.query.limit
  console.log(query);
  const activity = await Activity.getActivity(query)
  // let a = activity.map(async (item) => {
  //   //发起人的用户名和头像
  //   const promoter = await User.getUserInfo(item.uid)
  //   console.log(promoter)
  //   item.promoter = promoter 
  //   const applyNum = await Enlist.applyNum(item.id)
  //   item.applyNum = applyNum
  //   return item
  // })
  for(let i = 0;i<activity.length;i++){
    const promoter = await User.getUserInfo(activity[i].uid)
    //console.log(promoter)
    //发起人的用户名和头像
    activity[i].dataValues.promoter = promoter 
    const applyNum = await Enlist.applyNum(activity[i].id)
    activity[i].dataValues.applyNum = applyNum
    //console.log(activity[i])
  }
  
  ctx.body = activity
})


router.post('/addActivity',new Examine().m,async (ctx,next) => {
  const v = await new AddActivityValidator().validate(ctx)
  console.log(v)
  const activity = await Activity.addActivity(ctx.request.body)
  if(!activity){
    throw new ParameterException()
  }
  ctx.body = {
    msg:'成功',
    status:201,
    errorCode:0
  }
})

module.exports = router