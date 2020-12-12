const Router = require('koa-router')
const {Activity} = require('../../models/activity')
const router = new Router({
  prefix:'/v1/activity'
})

router.get('/getActivity',async (ctx,next) => {
  console.log('a')
  //await Activity.getActivity()
  ctx.body = await Activity.getActivity()
})

module.exports = router