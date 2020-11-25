const {LinValidator,Rule} = require('../../core/lin-validator-v2')

class LoginValidator extends LinValidator{
  constructor(){
    super()
    this.code = [
      // new Rule('isLength', '密码至少6个字符，最多32个字符', {
      //   min: 6,
      //   max: 32
      // })
      new Rule('isLength','code不能为空',{min:1})
    ]
  }
}

module.exports = {
  LoginValidator
}