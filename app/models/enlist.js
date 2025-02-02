const { db } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('./user');
const {ParameterException} = require("../../core/http-exception");
const { findAll } = require('./activity');


class Enlist extends Model{
  /**
   * 获取报名的人数
   * @param {*} aid 活动id
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
   * @param {*} aid 活动ID
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
   * @param {*} uid 用户id
   * @param {*} aid 活动id
   * @param {*} name报名人名称
   * @param {*} phone 报名人电话
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
  /**
   * 获取用户报名的活动id
   */
  static async getUserEnlistActivity(uid){
    const enlist = await Enlist.findAll({
      attributes:['aid'],
      where:{
        uid:uid
      }
    })
    const aids = []
    console.log()
    for (const item of enlist) {
      aids.push(item.aid)
    }
    console.log(aids)
    return aids
  }
  /**
   * 获取报名信息
   */
  static async getEnlistInfo(aid,uid){
    const enlistInfo = await Enlist.findOne({
      where:{
        aid:aid,
        uid:uid
      }
    })
    return enlistInfo
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