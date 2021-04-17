const Router = require('koa-router')
const Activity = require('../../models/activity')
const User = require('../../models/user')
const Enlist = require('../../models/enlist')
const {activityEnlistValidator,subscribeMessageValidator} = require('../../validators/validator')
const {Auth} = require('../../../middleware/auth');
const {wx} = require('../../../config/config')
const axios = require('axios')
const router = new Router({
  prefix:'/v1/Enlist'
})

/**
 * 报名活动
 */
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
/**
 * 订阅信息
 */
router.post('/subscribeMessage',new Auth().m,async(ctx,async) => {
  console.log('---------------------------');
  const v = await new subscribeMessageValidator().validate(ctx)
  const uid = ctx.auth.id
  const activity = await Activity.activityInfo(v.get('body.aid'))
  console.log('0');
  const nowTime = Date.parse(new Date())
  console.log(nowTime +'1~')
  console.log(activity);
  console.log(activity[0].dataValues.activityTime +"2~");
  const activityTime = Date.parse(activity[0].dataValues.activityTime)
  console.log(activityTime +'3~');
  const differ = activityTime - nowTime
  //订阅信息
  console.log(differ +'ddddddddddd');
  if(differ < 86400000){
    console.log('CCCCCCCCCCCCCCCCCCC');
    const {openId} = await User.getOpenId(uid)
    const {data} = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wx.appid}&secret=${wx.secret}`)
    //console.log(data.access_token);
    const res = await axios({
      url:`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${data.access_token}`,
      method:"POST",
      data:{
        touser:openId,
        template_id:'Xn26NFlTGIg3laBb0kAKXLKDZYgv8ZHRaIly417RQ3E',
        data:{
          ["thing4"]:{
            "value":activity[0].activityName
          },
          ["thing6"]:{
            "value":activity[0].activityAddress
          },
          ["date5"]:{
            "value":activity[0].activityTime
          },
          ["thing7"]:{
            "value":"请注意，活动即将开始!"
          }
        }
      }
    })
    console.log(res.data);
    if(res.data.errorCode == 0){
      ctx.body = {
        msg:"发送成功",
        errorCode:0,
        code:200
      }
    }
  }else{
    let time = setInterval(async() => {
      const nowTime = Date.parse(Date())
      // console.log(nowTime)
      const activityTime = Date.parse(activity[0].activityTime)
      //console.log(activityTime);
      const differ = activityTime - nowTime
      if(differ < 86400000){
        const {openId} = await User.getOpenId(uid)
        const {data} = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wx.appid}&secret=${wx.secret}`)
        console.log(data.access_token);
        const res = await axios({
          url:`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${data.access_token}`,
          method:"POST",
          data:{
            touser:openId,
            template_id:'Xn26NFlTGIg3laBb0kAKXLKDZYgv8ZHRaIly417RQ3E',
            data:{
              ["thing4"]:{
                "value":activity[0].activityName
              },
              ["thing6"]:{
                "value":activity[0].activityAddress
              },
              ["date5"]:{
                "value":activity[0].activityTime
              },
              ["thing7"]:{
                "value":"请注意，活动即将开始!"
              }
            }
          }
        })
        if(res.data.errorCode == 0){
          clearInterval(time)
          ctx.body = {
            msg:"发送成功",
            errorCode:0,
            code:200
          }
        }
        
      }
    },5000);
    //50000000
  }
})


module.exports = router