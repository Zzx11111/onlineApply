const {LinValidator,Rule} = require('../../core/lin-validator-v2')
//登录校验
class LoginValidator extends LinValidator{
  constructor(){
    super()
    this.code = [
      new Rule('isLength','code不能为空',{min:1})
    ]
  }
}
//获取活动校验
class getActivityValidator extends LinValidator{
  constructor(){
    super()
    
  }
}

module.exports = {
  LoginValidator,
  getActivityValidator
}