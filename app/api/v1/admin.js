const Router = require('koa-router')
const Activity = require('../../models/activity')
const User = require('../../models/user')
const Enlist = require('../../models/enlist')
const Admin = require('../../models/admin')
const Menu = require('../../models/menu')
const Role = require('../../models/role')
const Role_menu =require('../../models/role_menu')
const {AdminLoginValidator,EditAdminValidator,AddAdminValidator,deleteAdminValidator,editPasswordValidator} = require('../../validators/validator')
const {ParameterException} = require('../../../core/http-exception');
const { Auth } = require('../../../middleware/auth')
const router = new Router({
  prefix:'/v1/admin'
})

router.post('/login',async (ctx,next) => {
  const v = await new AdminLoginValidator().validate(ctx)
  const admin = await Admin.login({
    account:v.get('body.account'),
    password:v.get('body.password')
  })
  ctx.body = admin
})
//获取菜单
router.get('/getAdminInfo',new Auth().m,async (ctx,next) => {
  const id = ctx.auth.id
  const adminInfo = await Admin.getAdminInfo(id)
  const menuIdList = await Role_menu.getMenuID(adminInfo.roleID)
  const menuIds = []
  for (const item of menuIdList) {
    menuIds.push(item.dataValues.menuID)
  }
  console.log(adminInfo.name)
  const menuList = await Menu.getMenu(menuIds)
  ctx.body = {
    account:adminInfo.account,
    menuList:menuList
  }
})

//获取管理员列表
router.get('/getAdminList',new Auth().m,async (ctx,next) => {
  const adminList = await Admin.getAdminList()
  for (const item of adminList) {
    const role = await Role.getRole(item.roleID)
    item.dataValues.roleName = role.name
  }
  ctx.body = adminList
})
//获取角色列表
router.get('/getRole',new Auth().m,async (ctx,next) => {
  const roleList = await Role.getRoleList()
  ctx.body = roleList
})


router.post('/editAdmin',new Auth().m,async (ctx,next) => {
  const v = await new EditAdminValidator().validate(ctx)
  const id = v.get("body.id")
  const roleID = v.get("body.roleID")
  const admin = await Admin.editAdmin({id,roleID})
  if(admin[0] === 0){
    throw new ParameterException('更新失败')
  }
  ctx.body = {
    msg:'更新成功',
    errorCode:0
  }
})

router.post('/addAdmin',new Auth().m,async (ctx,next) => {
  const v = await new AddAdminValidator().validate(ctx)
  const account = v.get('body.account')
  const password = v.get('body.password')
  const roleID = v.get('body.roleID')
  const admin = await Admin.addAdmin({account,password,roleID})
  if(admin !== true){
    throw new ParameterException('添加失败')
  }
  ctx.body = {
    msg:"添加成功",
    errorCode:0
  }
})

router.post('/deleteAdmin',new Auth().m,async (ctx,next) => {
  const v = await new deleteAdminValidator().validate(ctx)
  const id = v.get('body.id')
  console.log(id)
  const data = await Admin.deleteAdmin(id)
  if(data !== true){
    throw new ParameterException('更新失败')
  }
  ctx.body = {
    msg:"删除成功",
    errorCode:0
  }
})

router.post('/editPassword',new Auth().m,async (ctx,next) => {
  console.log('sssssssssss');
  const v = await new editPasswordValidator().validate(ctx)
  const id = ctx.auth.id;
  const oldPassword = v.get('body.oldPassword')
  const newPassword = v.get('body.newPassword')
  const data = await Admin.editPassword({id,oldPassword,newPassword})
  if(data == true){
    ctx.body = {
      msg:"修改密码成功",
      errorCode:0
    }
  }
})


module.exports = router