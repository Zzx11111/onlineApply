const Koa = require('koa');
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middleware/exception')
const serve = require('koa-static')

const app = new Koa()

app.use(catchError)
app.use(serve(__dirname+'/static'))
app.use(parser())

InitManager.initCore(app)
app.listen(3000)