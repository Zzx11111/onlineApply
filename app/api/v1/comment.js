const Router = require('koa-router')
const {HttpException} = require('../../../core/http-exception')
const {addCommentValidator,GetCommentValidator,deleteCommentValidator} = require('../../validators/validator')
const User = require('../../models/user')
const Comment = require('../../models/comment')
const {Auth} = require('../../../middleware/auth')
const {generateToken} = require('../../../core/utils')
const axios = require('axios')
const router = new Router({
  prefix:'/v1/comment'
})

router.post('/addComment',new Auth().m,async(ctx,next) => {
  const v = await new addCommentValidator().validate(ctx)
  const id = ctx.auth.id
  const a = await Comment.addComment(v.get("body.aid"),id,v.get("body.comment"))
  if(a){
    ctx.body = {
      code:201,
      errorCode:0,
      msg:"成功"
    }
  }
})

router.get('/getComment',async (ctx,next) => {
  const v = await new GetCommentValidator().validate(ctx)
  const aid = ctx.request.query.aid
  const comments = await Comment.getComment(aid)
  console.log(comments)
  for(let i = 0;i<comments.length;i++){
    const promoter = await User.getUserInfo(comments[i].uid)
    //发起人的用户名和头像
    comments[i].dataValues.promoter = promoter 
  }
  ctx.body = comments
})
/**
 * 删除评论
 */
router.post('/deleteComment',new Auth().m,async (ctx,next) => {
  const v = await new deleteCommentValidator().validate(ctx)
  const id = v.get('body.id')
  const res = await Comment.deleteComment(id)
  if(res == true){
    ctx.body = {
      msg:'删除成功',
      errorCode:0,
      code:200
    }
  }
})






module.exports = router