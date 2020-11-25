const {connection} =  require('./db')


//查询
class Select{
  constructor(){}
  static fn(name,items){
    let sql = 'select '
    if(Array.isArray(items)){
      for(let i = 0;i<items.length;i++){
        let last = i ===items.length-1 ?'':','
        sql += items[i] + last
      }
      return `${sql} from ${name};`
    }
    return `${sql}* from ${name}; `
  }
  //条件查询
  static wherefn(name,items,whereValue){
    let sql = this.fn(name,items).split(';')[0]
    return `${sql} where ${whereValue};`
  }
}
//添加
class Insert{
  constructor(){}
  static fn(name,row='',rowValue){
    let sql = 'insert into '
    if(row === ''){
      return `${sql}${name} values (${rowValue})`
    }
    return `${sql}${name} (${row}) values (${rowValue})`
  }
}

module.exports = {
  Select,
  Insert
}