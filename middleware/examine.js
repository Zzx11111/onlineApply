//图片和文字审核
const axios = require('axios')
const qs = require('qs');
const {ParameterException} = require("../core/http-exception")
class Examine{
  constructor(){

  }
  get m(){
    return async(ctx,next) => {
      const activity = ctx.request.body
      
      const {data} = await axios({
        method:"post",
        url:"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=0cKg1Ln1gTvMVSbNhZeTbhMY&client_secret=25tAKOO1DwsEoNaM3Tsg7euPDG7ZD6V0"
      })
      // const a = await axios({
      //   method:"get",
      //   url:"https://elm.cangdu.org/v1/cities?type=guess"
      // }
      const access_token = data.access_token
      console.log(access_token);
      // if(!access_token){
        
      // }
      
      const image = activity.image.replace("data:image/jpg;base64,","")
      const text = activity.activityName + activity.activityContent
      const imageRes = await axios({
        method:"post",
        url:`https://aip.baidubce.com/rest/2.0/solution/v1/img_censor/v2/user_defined?access_token=${access_token}`,
        headers:{
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data:qs.stringify({
          image:image
        })
      })
      const textRes = await axios({
        method:"post",
        url:`https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined?access_token=${access_token}`,
        headers:{
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data:qs.stringify({
          text:text
        })
      })
      if(textRes.data.conclusionType === 1 && imageRes.data.conclusionType === 1){
        await next()
      }else{
        console.log('ddd');
        throw new ParameterException("发布活动内容不合法")
      }
      // console.log(textRes.data.conclusionType);
      // console.log(imageRes.data.conclusionType)
      
    }
  }
}

module.exports = {
  Examine
}