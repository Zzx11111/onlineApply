const {MysqlOperate} = require('../../core/mysql-operate')

class Activity{
  static async getActivity(){
    let activity = await MysqlOperate.query('select * from activity')
    console.log(activity[0].createTime.getHours())
    console.log(activity[0].createTime)
    return activity
  }
}

module.exports = {
  Activity
}