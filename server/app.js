const express = require('express')
const bodyParser = require('body-parser') // 解析body字段模块
// const cookieParser = require('cookie-parser')
// const cookieSession = require('cookie-session')
var index = require('./routes/index')
var users = require('./routes/users')
var sc = require('./routes/sc')
var session = require('express-session')
const morgan = require('morgan') // 命令行log显示
const passport = require('passport')// 用户认证模块passport

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
  // req.session.user
  next()
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
