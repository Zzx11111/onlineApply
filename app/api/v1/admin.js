const Router = require('koa-router')
const Activity = require('../../models/activity')
const User = require('../../models/user')
const Enlist = require('../../models/enlist')
const Admin = require('../../models/admin')
const Menu = require('../../models/menu')
const Role = require('../../models/role')
const Role_menu =require('../../models/role_menu')
const {AdminLoginValidator} = require('../../validators/validator')
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


router.post('/editAadmin',async (ctx,next) => {
  
})


module.exports = router