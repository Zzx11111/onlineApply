const {connection} = require('./db')

class MysqlOperate{
  static async query(sentence){
    return new Promise((resolve,reject) => {
      
      connection.query(sentence,(error,res) => {
        if(error){
          reject(error)
        }else{
          resolve(res)
        }
      })

    })
  }
}

module.exports= {
  MysqlOperate
}