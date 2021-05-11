const Router = require('koa-router');
const requireDirectory  = require('require-directory');

class InitManager{
  //路由自动加载
  static initCore(app){
    InitManager.initLoadRouters(app)
  }
  static initLoadRouters(app) {
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module,apiDirectory,{
      visit:whenLoadModule
    })
    function whenLoadModule(obj) {
      if(obj instanceof Router){
        app.use(obj.routes())
      }
    }
  }
}

module.exports = InitManager