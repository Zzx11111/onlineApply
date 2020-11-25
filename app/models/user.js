const {MysqlOperate} = require('../../core/mysql-operate')
const axios = require('axios')
const {wx} = require('../../config/config')
const {AuthFailed} = require('../../core/http-exception')
class User{
  //用户登录、第一次登录的创建用户
  static async wxLogin(code){
    let res = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${wx.appid}&secret=${wx.secret}&js_code=${code}&grant_type=authorization_code`)
    if(res.status !== 200){
      throw new AuthFailed('openid获取失败')
    }
    const {openid,errcode,errmsg} = res.data
    if(errcode){
      throw new AuthFailed(`openid获取失败,错误信息：${errmsg}`,errcode)
    }
    console.log(openid)
    let user = await MysqlOperate.query('select * from user')
    //console.log(user)
  }
}

module.exports = User