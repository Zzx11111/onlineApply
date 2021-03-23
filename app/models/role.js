const { Sequelize, Model } = require('sequelize');

const { db } = require('../../core/db');


class Role extends Model{
  static async getRole(id){
    const role = await Role.findOne({
      where:{
        id
      }
    })
    return role
  }
  static async getRoleList(){
    const roleList = await Role.findAll()
    return roleList
  }
}


Role.init({
  id:{
    primaryKey: true,
    type:Sequelize.INTEGER
  },
  name:Sequelize.STRING
},{ sequelize: db, tableName: 'role', updatedAt: false, createdAt: false })

module.exports = Role