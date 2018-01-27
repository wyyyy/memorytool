const express = require('express')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const cookieSession = require('cookie-session')
var index = require('./routes/index')
var users = require('./routes/users')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
// the cores config
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  console.log('server.*')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
    // make the require of options turn back quickly/
  } else {
    next()
  }
})
app.use('/', index)
app.use('/users', users)
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
// deal (cookie,session)
module.exports = app
