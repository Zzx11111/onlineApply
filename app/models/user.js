const { Sequelize, Model } = require('sequelize');
const axios = require('axios')
const { db } = require('../../core/db');
const {wx} = require('../../config/config')
const {AuthFailed,ParameterException} = require('../../core/http-exception')
class User extends Model{
  //用户登录、第一次登录的创建用户
  static async wxLogin({code,username,avatarUrl}){
    let res = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${wx.appid}&secret=${wx.secret}&js_code=${code}&grant_type=authorization_code`)
    if(res.status !== 200){
      throw new AuthFailed('openid获取失败')
    }
    const {openid,errcode,errmsg} = res.data
    if(errcode){
      throw new AuthFailed(`openid获取失败,错误信息：${errmsg}`,errcode)
    }
    const count = await User.count({
      where:{
        openId:openid
      }
    })
    if(count !== 0){
      await User.update({username:username,avatarUrl:avatarUrl},{where:{openId:openid}})
    }else{
      await User.create({
        openId:openid,
        username:username,
        avatarUrl:avatarUrl,
      })
    }
    const user = await User.findOne({
      where:{
        openId:openid
      }
    })
    return user
  }
  /**
   * 
   * @param {*} uid 用户id
   */
  static async getUserInfo(uid){
    const user = await User.findOne({
      where:{
        id:uid
      }
    })
    return {
      uid:user.id,
      username:user.username,
      avatarUrl:user.avatarUrl,
      name:user.name,
      phone:user.phone
    }
  }
  static async getOpenId(uid){
    const user = await User.findOne({
      where:{
        id:uid
      }
    })
    return {
      openId:user.openId
    }
  }/**
   * 修改用户信息
   * @param {*} param
   */
  static async updateInfo({id,name,phone}){
    const user = await User.update({name:name,phone:phone},{
      where:{
        id:id
      }
    })
    return user
  }
  /**
   * 查询所有用户
   */
  static async getUserList(){
    const userList = await User.findAll({
      attributes: ['id', 'username','name','phone','openId']
    })
    return userList
  }
  static async deleteUser(id){
    const data = await User.destroy({
      where:{id}
    })
    if(data === 0){
      throw new ParameterException('删除失败')
    }
    return true
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
  name:Sequelize.STRING,
  phone:Sequelize.STRING
}, { sequelize: db, tableName: 'user', updatedAt: false, createdAt: false })
module.exports = User