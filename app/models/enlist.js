const { db } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('./user');
const {ParameterException} = require("../../core/http-exception")


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
  /**
   * 
   * @param {用户id} uid 
   * @param {活动id} aid 
   * @param {报名人名称} name
   * @param {报名人电话} phone 
   */
  static async activityEnlist(uid,aid,name,phone){
    const row = await Enlist.count({
      where:{
        uid:uid,
        aid:aid
      }
    })
    console.log(row)
    if(row > 0){
      throw new ParameterException('已经报名了')
    }
    const enlist = await Enlist.create({
      uid:uid,
      aid:aid,
      name:name,
      phone:phone
    })
    return enlist
  }
}

Enlist.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid:Sequelize.INTEGER,
  aid:Sequelize.INTEGER,
  name:Sequelize.STRING,
  phone:Sequelize.STRING
}, { sequelize: db, tableName: 'enlist', updatedAt: false, createdAt: false })

module.exports = Enlist