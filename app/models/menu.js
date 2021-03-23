const { Sequelize, Model, CITEXT } = require('sequelize');
const { db } = require('../../core/db');
const {ParameterException} = require('../../core/http-exception')

class Menu extends Model{
  /**
   * 获取菜单列表
   * @param {*} ids 菜单Id 
   */
  static async getMenu(ids){
    const menuList = await Menu.findAll({
      where:{
        id:ids
      }
    })
    return menuList
  }
}

Menu.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name:Sequelize.STRING,
  page_url:Sequelize.STRING,
  icon:Sequelize.STRING
},{ sequelize: db, tableName: 'menu', updatedAt: false, createdAt: false })

module.exports = Menu