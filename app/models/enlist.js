const { db } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');



class Enlist extends Model{
  static async applyNum(aid){
    const count = await Enlist.count({
      where:{
        aid
      }
    })
    return count
  }
}

Enlist.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid:Sequelize.INTEGER,
  aid:Sequelize.INTEGER
}, { sequelize: db, tableName: 'enlist', updatedAt: false, createdAt: false })

module.exports = Enlist