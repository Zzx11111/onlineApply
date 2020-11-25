const mysql = require('mysql')


const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  database:'onlineApply'
})


connection.connect();

module.exports = {
  connection
}