const { db } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('./user');



class Enlist extends Model{
  /**
   * 获取报名的人数
   * @param {活动id} aid 
   */
  static async applyNum(aid){
    const count = await Enlist.count({
      where:{
        aid
      }
    })
    return count
  }
  /**
   * 获取前四名热门活动
   */
  static async hotActivity(activityIds){
    const ids = await Enlist.findAll({
      attributes: ['aid'],
      group:'aid',
      order:[
        [sequelize.fn('count',sequelize.col("aid")),'DESC']
      ],
      limit:2
    })
    return ids
  }
  /**
   * 报名名单
   * @param {活动ID} aid 
   */
  static async enlistPeopleList(aid){
    console.log(aid)
    const uids = await Enlist.findAll({
      where:{
        aid:aid
      }
    })
    return uids
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