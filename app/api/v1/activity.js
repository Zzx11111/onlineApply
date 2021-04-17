const Router = require('koa-router')
const Activity = require('../../models/activity')
const User = require('../../models/user')
const Enlist = require('../../models/enlist')
const {AddActivityValidator,searchActivityValidator,activityInfoValidator,nearlyActivityValidator} = require('../../validators/validator')
const {ParameterException} = require('../../../core/http-exception');
const {Examine} = require('../../../middleware/examine');
const { Auth } = require('../../../middleware/auth')
const router = new Router({
  prefix:'/v1/activity'
})
/**
 * 获取活动列表
 */
router.get('/getActivity',async (ctx,next) => {
  const query = {}
  query.offset = ctx.request.query.offset
  query.limit = ctx.request.query.limit
  //console.log(query);
  const activity = await Activity.getActivity(query)
  for(let i = 0;i<activity.length;i++){
    const promoter = await User.getUserInfo(activity[i].uid)
    //发起人的用户名和头像
    activity[i].dataValues.promoter = promoter 
    const applyNum = await Enlist.applyNum(activity[i].id)
    activity[i].dataValues.applyNum = applyNum
  }
  console.log(activity)
  ctx.body = activity
})



/**
 * 添加活动
 */
//new Examine().m
router.post('/addActivity',new Auth().m,new Examine().m,async (ctx,next) => {
  const uid = ctx.auth.id
  const v = await new AddActivityValidator().validate(ctx)
  const activityObj = ctx.request.body
  activityObj.uid = uid
  console.log(activityObj)
  const activity = await Activity.addActivity(activityObj)
  
  if(!activity){
    throw new ParameterException()
  }
  ctx.body = {
    msg:'成功',
    status:201,
    errorCode:0
  }
})
/**
 * 获取热门活动
 */
router.get('/hotActivity',async (ctx,next) => {
  const activity = await Activity.allActivity();
  let activityIds = []
  console.log(activity[0].id)
  for (const item of activity) {
    activityIds.push(item.id)
    console.log(item.id)
  }
  // const activityIds = activity.map(item => {
  //   return item.id
  // })
  console.log(activityIds);
  const ids = await Enlist.hotActivity(activityIds);

  ctx.body = ids
})
/**
 * 搜索活动
 */
router.post('/searchActivity',async (ctx,next) => {
  const v = await await new searchActivityValidator().validate(ctx)
  const activity = await Activity.searchActivity(v.get('body.keyWord'))
  for(let i = 0;i<activity.length;i++){
    console.log(activity[i].uid);
    const promoter = await User.getUserInfo(activity[i].uid)
    console.log(promoter)
    //发起人的用户名和头像
    activity[i].dataValues.promoter = promoter 
    const applyNum = await Enlist.applyNum(activity[i].id)
    activity[i].dataValues.applyNum = applyNum
  }
  ctx.body = activity
})
/**
 * 获取活动详情
 */
router.post('/activityInfo',async (ctx,next) => {
  const v = await new activityInfoValidator().validate(ctx)
  const id = v.get("body.id")
  const activity = await Activity.activityInfo(id)
  const promoter = await User.getUserInfo(activity[0].dataValues.uid)
  activity[0].dataValues.promoter = promoter
  const uids = await Enlist.enlistPeopleList(id)
  activity[0].dataValues.enlistList = []
  for(let item of uids){
    //报名人
    const Applicant = await User.getUserInfo(item.dataValues.uid)
    const enlistInfo = await Enlist.getEnlistInfo(id,item.dataValues.uid)
    Applicant.name = enlistInfo.name
    Applicant.phone = enlistInfo.phone
    activity[0].dataValues.enlistList.push(Applicant)
  }
  ctx.body = activity[0]
})
/**
 * 获取附近的活动
 */
router.post('/nearlyActivity',async (ctx,next) => {
  //console.log("ddddddd")
  const v = await new nearlyActivityValidator().validate(ctx)
  //console.log(v.get("body.latitude"))
  const activity = await Activity.nearlyActivity(v.get('body.latitude'),v.get('body.longitude'))
  for(let i = 0;i<activity.length;i++){
    const promoter = await User.getUserInfo(activity[i].uid)
    //发起人的用户名和头像
    activity[i].dataValues.promoter = promoter 
    const applyNum = await Enlist.applyNum(activity[i].id)
    activity[i].dataValues.applyNum = applyNum
  }
  ctx.body = activity
})

module.exports = router