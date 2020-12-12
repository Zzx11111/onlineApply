const {MysqlOperate} = require('../../core/mysql-operate')
const axios = require('axios')
const {wx} = require('../../config/config')
const {AuthFailed} = require('../../core/http-exception')
class User{
  //用户登录、第一次登录的创建用户
  static async wxLogin(code){
    let res = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${wx.appid}&secret=${wx.secret}&js_code=${code}&grant_type=authorization_code`)
    console.log(res)
    if(res.status !== 200){
      throw new AuthFailed('openid获取失败')
    }
    const {openid,errcode,errmsg} = res.data
    if(errcode){
      throw new AuthFailed(`openid获取失败,错误信息：${errmsg}`,errcode)
    }
    let user = await MysqlOperate.query(`select * from user where openId='${openid}'`)
    console.log(user)
    if(user.length === 0){
      await MysqlOperate.query(`insert into user (openId) values ('${openid}')`)
    }
    return user[0]
  }
}

module.exports = User