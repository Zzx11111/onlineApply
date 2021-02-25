const Router = require('koa-router')
const { map } = require('lodash')
const Activity = require('../../models/activity')
const User = require('../../models/user')
const Enlist = require('../../models/enlist')
const {AddActivityValidator,searchActivityValidator,activityInfoValidator} = require('../../validators/validator')
const {ParameterException} = require('../../../core/http-exception');
const {Examine} = require('../../../middleware/examine');
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
  console.log(query);
  const activity = await Activity.getActivity(query)
  for(let i = 0;i<activity.length;i++){
    const promoter = await User.getUserInfo(activity[i].uid)
    //发起人的用户名和头像
    activity[i].dataValues.promoter = promoter 
    const applyNum = await Enlist.applyNum(activity[i].id)
    activity[i].dataValues.applyNum = applyNum
  }
  
  ctx.body = activity
})

/**
 * 添加活动
 */
//new Examine().m
router.post('/addActivity',async (ctx,next) => {
  const v = await new AddActivityValidator().validate(ctx)
  console.log(v.get("body.activityContent"));
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
/**
 * 获取热门活动
 */
router.get('/hotActivity',async (ctx,next) => {
  console.log("aaa");
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
  // console.log(ids);

  ctx.body = ids
})
/**
 * 搜索活动
 */
router.post('/searchActivity',async (ctx,next) => {
  const v = await await new searchActivityValidator().validate(ctx)
  const activity = await Activity.searchActivity(v.get('body.keyWord'))
  for(let i = 0;i<activity.length;i++){
    const promoter = await User.getUserInfo(activity[i].uid)
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
  const promoter = await User.getUserInfo(activity.dataValues.uid)
  activity.dataValues.promoter = promoter
  const uids = await Enlist.enlistPeopleList(id)
  activity.dataValues.enlistList = []
  for(let item of uids){
    //报名人
    const Applicant = await User.getUserInfo(item.dataValues.uid)
    activity.dataValues.enlistList.push(Applicant)
  }
  ctx.body = activity
})

module.exports = router