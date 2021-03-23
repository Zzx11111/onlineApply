const { Sequelize, Model, CITEXT } = require('sequelize');

const { db } = require('../../core/db');

const {ParameterException} = require('../../core/http-exception')


class Role_menu extends Model{
  /**
   * 获取菜单ID
   * @param {*} role_id角色ID
   */
  static async getMenuID(roleID){
    const menuIdList = await Role_menu.findAll({
      attributes:['roleID','menuID'],
      where:{
        roleID
      }
    })
    return menuIdList
  }
}


// Role_menu.init({
//   roleID:Sequelize.INTEGER,
//   menuID:Sequelize.INTEGER
// },{sequelize: db, tableName: 'role_menu', updatedAt: false, createdAt: false})




Role_menu.init({
  roleID:Sequelize.INTEGER,
  menuID:Sequelize.INTEGER,
}, { sequelize: db, tableName: 'role_menu', updatedAt: false, createdAt: false })

module.exports = Role_menu