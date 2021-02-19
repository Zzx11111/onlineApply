
const { db } = require('../../core/db');
const { Sequelize, Model,Op } = require('sequelize');
const fs = require('fs')
const { ParameterException } = require('../../core/http-exception');
const { sequelize } = require('./user');

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
    console.log(createTime)
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
    console.log(activity)
    const row = await Activity.create(activity)
    return row
  }
  /**
   * 
   */
  static async getActivity({offset = 0,limit = 10}){
    let nowDate = new Date().toLocaleString();
    const activity = await Activity.findAll({offset,limit,
      where:{
        activityTime:{
          [Op.gt]: nowDate
        }
    }})
    console.log(activity)
    return activity
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