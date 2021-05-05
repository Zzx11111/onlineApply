const { Sequelize, Model, CITEXT } = require('sequelize');
const axios = require('axios')
const { db } = require('../../core/db');
const {ParameterException} = require('../../core/http-exception')
const {generateToken} = require('../../core/utils');
class Admin extends Model{
  /**
   * 管理员登录
   * @param {*} param0 
   * @returns 
   */
  static async login({account,password}){
    const admin = await Admin.findOne({
      where:{
        account,
        password
      }
    })
    if(admin === null){
      throw new ParameterException('账号密码不正确')
    }
    const token = generateToken(admin.id,admin.roleID)
    return {
      token:token,
      id:admin.id
    }
  }
  /**
   * 获取管理员的信息
   * @param {*} id 
   * @returns 
   */
  static async getAdminInfo(id){
    const admin = await Admin.findOne({
      where:{
        id
      }
    })
    return admin
  }
  /**
   * 获取管理员列表
   * @returns 
   */
  static async getAdminList(){
    const adminList = await Admin.findAll({
      attributes:['id','account','roleID']
    })
    return adminList
  }
  /**
   * 修改管理员
   * @param {*} data 
   */
  static async editAdmin(data){
    const adminList = await Admin.update({
      roleID:data.roleID
    },
    {
      where:{
        id:data.id
      }
    })
    return adminList
  }
  /**
   * 删除管理员
   * @param {*} id 
   */
  static async deleteAdmin(id){
    console.log(id)
    const admin = await Admin.destroy({
      where:{id}
    })
    if(admin !== 0){
      return true
    }
  }
  /**
   * 添加管理员
   * @param {*} data 
   */
  static async addAdmin({account,password,roleID}){
    const row = await Admin.count({
      where:{account}
    })
    if(row>0){
      throw new ParameterException('账号已存在')
    }
    const role = Number(roleID)
    console.log(roleID)
    const admin = await Admin.create({
      account,
      password,
      roleID:role
    })
    if(admin.id !== null){
      return true
    }else{
      return false
    }
  }


  static async editPassword({id,oldPassword,newPassword}){
    const row = await Admin.count({
      where:{
        id,
        password:oldPassword
      }
    })
    console.log(row);
    if(row < 1){
      throw new ParameterException('原密码错误')
    }
    const admin = await Admin.update({password:newPassword},{
      where:{
        id,
        password:oldPassword
      }
    })
    return true
  }
}


Admin.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  account:Sequelize.STRING,
  password:Sequelize.STRING,
  roleID:Sequelize.INTEGER
}, { sequelize: db, tableName: 'admin', updatedAt: false, createdAt: false })

module.exports = Admin