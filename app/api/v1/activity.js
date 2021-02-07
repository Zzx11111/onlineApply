const Router = require('koa-router')
const { map } = require('lodash')
const {Activity} = require('../../models/activity')
const {AddActivityValidator} = require('../../validators/validator')
const {ParameterException} = require('../../../core/http-exception');
const {Examine} = require('../../../middleware/examine');
const router = new Router({
  prefix:'/v1/activity'
})

router.get('/getActivity',async (ctx,next) => {
  console.log('a')
  //await Activity.getActivity()
  ctx.body = await Activity.getActivity()
})


router.post('/addActivity',new Examine().m,async (ctx,next) => {
  const v = await new AddActivityValidator().validate(ctx)
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