const {LinValidator,Rule} = require('../../core/lin-validator-v2')
//登录校验
class LoginValidator extends LinValidator{
  constructor(){
    super()
    this.code = [
      new Rule('isLength','code不能为空',{min:1})
    ],
    this.avatarUrl = [
      new Rule('isLength','avatarUrl不能为空',{min:1})
    ],
    this.username = [
      new Rule('isLength','username不能为空',{min:1})
    ]
  }
}
//搜索活动校验
class searchActivityValidator extends LinValidator{
  constructor(){
    super()
    this.keyWord = [
      new Rule('isLength','关键字不能为空',{min:1})
    ]
  }
}
class activityInfoValidator extends LinValidator{
  constructor(){
    super()
    this.id = [
      new Rule('isLength','活动id不能为空',{min:1})
    ]
  }
}

//发布活动校验
class AddActivityValidator extends LinValidator{
  constructor(){
    super()
    this.image = [
      new Rule('isLength','图片不能为空',{min:1})
    ]
    this.activityName = [
      new Rule('isLength','活动名称不能为空',{min:1})
    ]
    this.activityTime = [
      new Rule('isLength','日期不能为空',{min:1})
    ]
    // this.address = [
    //   new Rule('isLength','地址不能为空',{min:1})
    // ]
    this.latitude = [
      new Rule('isLength','纬度不能为空',{min:1})
    ]
    this.longitude = [
      new Rule('isLength','经度不能为空',{min:1})
    ]
    this.activityAddress = [
      new Rule('isLength','地址名称不能为空',{min:1})
    ]
    this.activityContent = [
      new Rule('isLength','活动内容不能为空',{min:1})
    ]
    this.phone = [
      new Rule('isLength','联系电话不能为空',{min:1})
    ]
  }
  
}
//活动报名校验
class activityEnlistValidator extends LinValidator{
  constructor(){
    super()
    this.aid = [
      new Rule('isLength','aid不能为空',{min:1})
    ]
    this.name = [
      new Rule('isLength','姓名不能为空',{min:1})
    ]
    this.phone = [
      new Rule('isLength','联系电话不能为空',{min:1})
    ]
  }
}
class subscribeMessageValidator extends LinValidator{
  constructor(){
    super()
    this.aid = [
      new Rule('isLength','aid不能为空',{min:1})
    ]
  }
}
class updateInfoValidator extends LinValidator{
  constructor(){
    super()
    this.name = [
      new Rule('isLength','姓名不能为空',{min:1})
    ]
    this.phone = [
      new Rule('isLength','联系电话不能为空',{min:1})
    ]
  }
}
class nearlyActivityValidator extends LinValidator{
  constructor(){
    super()
    this.latitude = [
      new Rule('isLength','latitude不能为空',{min:1})
    ]
    this.longitude = [
      new Rule('isLength','longitude不能为空',{min:1})
    ]
  }
}
class addCommentValidator extends LinValidator{
  constructor(){
    super()
    this.aid = [
      new Rule('isLength','活动id不能为空',{min:1})
    ]
    this.comment = [
      new Rule('isLength','评论内容不能为空',{min:1})
    ]
  }
}
class GetCommentValidator extends LinValidator{
  constructor(){
    super()
    this.aid = [
      new Rule('isLength','活动id不能为空',{min:1})
    ]
  }
}
class AdminLoginValidator extends LinValidator{
  constructor(){
    super()
    this.account = [
      new Rule('isLength','账号不能为空',{min:1})
    ]
    this.password = [
      new Rule('isLength','密码不能为空',{min:1})
    ]
  }
}


class EditAdminValidator extends LinValidator{
  constructor(){
    super()
    this.id = [
      new Rule('isLength','ID不能为空',{min:1})
    ]
    this.roleID = [
      new Rule('isLength','角色ID不能为空',{min:1})
    ]
  }
}
class AddAdminValidator extends LinValidator{
  constructor(){
    super()
    
    this.roleID = [
      new Rule('isLength','角色ID不能为空',{min:1})
    ]
    this.account = [
      new Rule('isLength','账号不能为空',{min:1})
    ]
    this.password = [
      new Rule('isLength','密码不能为空',{min:1})
    ]
  }
}
class deleteAdminValidator extends LinValidator{
  constructor(){
    super()
    this.id = [
      new Rule('isLength','ID不能为空',{min:1})
    ]
  }
}
class deleteUserValidator extends LinValidator{
  constructor(){
    super()
    this.id = [
      new Rule('isLength','ID不能为空',{min:1})
    ]
  }
}

class deleteCommentValidator extends LinValidator{
  constructor(){
    super()
    this.id = [
      new Rule('isLength','ID不能为空',{min:1})
    ]
  }
}
class deleteActivityValidator extends LinValidator{
  constructor(){
    super()
    this.id = [
      new Rule('isLength','ID不能为空',{min:1})
    ]
  }
}
class editPasswordValidator extends LinValidator{
  constructor(){
    super()
    this.oldPassword = [
      new Rule('isLength','原密码不能为空',{min:1})
    ]
    this.newPassword = [
      new Rule('isLength','新密码不能为空',{min:1})
    ]
  }
}

module.exports = {
  LoginValidator,
  AddActivityValidator,
  searchActivityValidator,
  activityInfoValidator,
  activityEnlistValidator,
  subscribeMessageValidator,
  updateInfoValidator,
  nearlyActivityValidator,
  addCommentValidator,
  GetCommentValidator,
  AdminLoginValidator,
  EditAdminValidator,
  AddAdminValidator,
  deleteAdminValidator,
  deleteUserValidator,
  deleteCommentValidator,
  deleteActivityValidator,
  editPasswordValidator
}