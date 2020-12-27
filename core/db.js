// const mysql = require('mysql')


// const connection = mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   password:'123456',
//   database:'onlineApply'
// })


// connection.connect();

// module.exports = {
//   connection
// }

const Sequelize = require('sequelize');

const sequelize = new Sequelize('onlineApply','root','123456',{
  dialect:'mysql',
  host:'localhost',
  port:'3306',
  logging:true,
  timezone: '+08:00',
  //时间格式删除时区
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  },
  // define:{

  // }
})


module.exports = {
  db:sequelize
}