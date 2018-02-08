const express = require('express')
const bodyParser = require('body-parser') // 解析body字段模块
// const cookieParser = require('cookie-parser')
// const cookieSession = require('cookie-session')
var index = require('./routes/index')
var users = require('./routes/users')
var sc = require('./routes/sc')
var pm = require('./routes/pm')
var tam = require('./routes/tam')
var session = require('express-session')
const morgan = require('morgan') // 命令行log显示
const passport = require('passport')// 用户认证模块passport
var jwt = require('jsonwebtoken')// 用来创建和确认用户信息摘要
const app = express()
app.use(passport.initialize())// 初始化passport模块
app.use(morgan('dev'))// 命令行中显示程序运行日志,便于bug调试
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // 调用bodyParser模块以便程序正确解析body传入值
// the cores config
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  var url = req.originalUrl
  console.log(url)
  // check post url headers
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  // req.session.user
  // 解析 token
  if (token) {
    // 确认token
    jwt.verify(token, 'app.get(superSecret)', function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'token信息错误.' })
      } else {
        // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
        req.api_user = decoded
        console.dir(req.api_user)
        next()
      }
    })
  } else {
    // 如果没有token，则返回错误
    /* return res.status(403).send({
      success: false,
      message: '没有提供token！'
    }) */
    next()
  }
  /* if (req.method === 'OPTIONS') {
    res.sendStatus(200)
    // make the require of options turn back quickly/
  } else {
    next()
  } */
})
app.use('/', index)
app.use('/users', users)
app.use('/sc', sc)
app.use('/pm', pm)
app.use('/tam', tam)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
var sess = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 1000 * 30}
}

app.use(session(sess))
// deal (cookie,session)
module.exports = app
// 只要参数有token或者头信息里有x-access-token，我们就认定它是一个api接口
// 增加一个service层，把多个model的操作放到里面
