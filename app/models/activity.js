
const { db } = require('../../core/db');
const { Sequelize, Model,Op } = require('sequelize');
const fs = require('fs')
const { ParameterException } = require('../../core/http-exception');
const {GetDistance} = require('../../core/utils')
// const { sequelize } = require('./user');

// class Activity{
//   static async getActivity(){
//     let activity = await MysqlOperate.query('select * from activity')
//     console.log(activity[0].createTime.getHours())
//     console.log(activity[0].createTime)
//     return activity
//   }
//   static async addActivity(){

//   }
// }

class Activity extends Model {
  /**
   * 添加活动
   * @param {*} activity 活动内容
   */
  static async addActivity(activity) {
    let imgBase = activity.image.replace(/^data:image\/\w+;base64,/, "");
    //当前时间
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    let dateTime = `${year}${month}${day}${formatNumber(hour)}${formatNumber(minute)}${formatNumber(second)}`
    let createTime = `${year}-${month}-${day} ${formatNumber(hour)}:${formatNumber(minute)}:${formatNumber(second)}`
    //图片转换存在static下
    let dataBuffer = Buffer.from(imgBase, 'base64');
    let name = process.cwd() + '\/static\/' + activity.uid + dateTime + '.jpg';
    try {
      fs.writeFileSync(name,dataBuffer)
    } catch (e) {
      throw new ParameterException('图片上传失败')
    }
    activity.image = activity.uid + dateTime +'.jpg'
    activity.createTime = createTime
    const row = await Activity.create(activity)
    return row
  }
  /**
   * 获取活动列表
   */
  static async getActivity({offset = 0,limit = 10}){
    let nowDate = new Date().toLocaleString();
    const offset1 = Number(offset)
    const limit1 = Number(limit)
    const activity = await Activity.findAll({offset:offset1,limit:limit1,
      where:{
        activityTime:{
          [Op.gt]: nowDate
        }
      }
    })
    console.log(activity);
    return activity
  }
  static async allActivity(ids){
    let nowDate = new Date().toLocaleString();
    const activity = await Activity.findAll({
      where:{
        activityTime:{
          [Op.gt]: nowDate
        }
    }})
    return activity
  }
  /**
   * 搜索活动
   * @param {*} keyword 搜索关键字
   */
  static async searchActivity(keyWord){
    let nowDate = new Date().toLocaleString();
    const activity = await Activity.findAll({
      where:{
        activityName:{
          [Op.substring]:keyWord
        }
      },
      order:[
        ['activityTime','DESC']
      ]
    })
    return activity
  }
  /**
   * 获取活动详情
   * @param {*} id 活动id
   */
  static async activityInfo(id){
    const activity = await Activity.findAll({
      where:{
        id:id
      }
    })
    return activity
  }
  /**
   * 获取附近的活动
   * 
   */
  static async nearlyActivity(latitude,longitude){
    let nowDate = new Date().toLocaleString();
    const activitys = await Activity.findAll({
      where:{
        activityTime:{
          [Op.gt]: nowDate
        }
      }
    })
    for (let i = 0;i<activitys.length;i++) {
      let distance = GetDistance(latitude,longitude,activitys[i].latitude,activitys[i].longitude)     
      //console.log(distance)
      activitys[i].dataValues.distance = distance
    }
    function compare(property){
      return function(a,b){
          var value1 = a.dataValues[property];
          var value2 = b.dataValues[property];
          return value1 - value2;
      }
    }
    return activitys.sort(compare('distance'))
  }
  /**
   * 获取用户参加的活动
   * @param {*} uid 用户id
   */
  static async getMyRelease(uid){
    const activity = await Activity.findAll({
      where:{
        uid:uid
      }
    })
    return activity
  }
  static async deleteActivity(id){
    const row = await Activity.destroy({
      where:{id}
    })
    if(row === 0){
      throw new ParameterException('删除失败')
    }
    return true
  }


}


Activity.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  activityName: Sequelize.STRING,
  createTime: Sequelize.DATE,
  activityAddress: Sequelize.STRING,
  activityTime: Sequelize.DATE,
  image: Sequelize.STRING,
  latitude: Sequelize.STRING,
  longitude: Sequelize.STRING,
  activityContent: Sequelize.STRING,
  phone: Sequelize.STRING,
  uid: Sequelize.INTEGER
}, { sequelize: db, tableName: 'activity', updatedAt: false, createdAt: false })



module.exports = Activity