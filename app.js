const Koa = require('koa');
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middleware/exception')
const serve = require('koa-static')
const cors = require('koa2-cors')

const app = new Koa()

app.use(cors())
// app.use(parser.json({limit : "21000000kb"}));  
app.use(catchError)
app.use(serve(__dirname+'/static'))
app.use(parser({
  jsonLimit:"10mb"
}))

InitManager.initCore(app)
app.listen(3000)