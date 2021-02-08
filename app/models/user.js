const { Sequelize, Model } = require('sequelize');
const axios = require('axios')
const { db } = require('../../core/db');
const {wx} = require('../../config/config')
const {AuthFailed} = require('../../core/http-exception')
class User extends Model{
  //用户登录、第一次登录的创建用户
  static async wxLogin({code,username,avatarUrl}){
    let res = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${wx.appid}&secret=${wx.secret}&js_code=${code}&grant_type=authorization_code`)
    // console.log(res)
    if(res.status !== 200){
      throw new AuthFailed('openid获取失败')
    }
    const {openid,errcode,errmsg} = res.data
    if(errcode){
      throw new AuthFailed(`openid获取失败,错误信息：${errmsg}`,errcode)
    }
    console.log(openid)
    const count = await User.count({
      where:{
        openId:openid
      }
    })
    console.log(count)
    if(count !== 0){
      await User.update({username:username,avatarUrl:avatarUrl},{where:{openId:openid}})
    }else{
      await User.create({
        openId:openid,
        username:username,
        avatarUrl:avatarUrl,
        isRelease:1
      })
    }
    const user = await User.findOne({
      where:{
        openId:openid
      }
    })
    return user
  }
}



User.init({
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  openId:Sequelize.STRING,
  username:Sequelize.STRING,
  avatarUrl:Sequelize.STRING,
  isRelease:Sequelize.INTEGER
}, { sequelize: db, tableName: 'user', updatedAt: false, createdAt: false })
module.exports = User