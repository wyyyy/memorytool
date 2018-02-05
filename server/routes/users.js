var express = require('express')
var users = express.Router()
const common = require('../libs/common')
// var dbpool = require('../libs/db.pool')
var db = require('../libs/db')
var jws = require('jws')

/* GET users listing. */
users.get('/', function (req, res, next) {
  console.log('router/users.js./')
  var user = req.session.user
  console.log('router.o' + user)
})
users.get('/login', function (req, res, next) {
  var user = req.session.user
  console.log('router/users.js./login.o' + user)
})
/*
     *user reg func
     */
users.post('/reg', (req, res) => {
  let mObj = {}
  for (let obj in req.body) {
    mObj = JSON.parse(obj)
  }
  let regName = mObj.regName
  let regPasswd = mObj.regPasswd
  regPasswd = common.md5(regPasswd + common.MD5_SUFFXIE)
  const insUserInfo = `INSERT INTO user(user_name,login_password,user_number) VALUES('${regName}','${regPasswd}','${regName}')`
  delReg(insUserInfo, res)
})
/*
     *deal user register
     */
function delReg (insUserInfo, res) {
  db.query(insUserInfo, (err) => {
    if (err) {
      console.error(err)
      res.send({ 'msg': '服务器出错', 'status': 0 }).end()
    } else {
      res.send({ 'msg': '注册成功', 'status': 1 }).end()
    }
  })
};

users.post('/login', (req, res) => {
  let mObj = {}
  for (let obj in req.body) {
    mObj = JSON.parse(obj)
  }
  console.log(req.session)
  console.log(mObj.loginPawd)
  let username = mObj.loginName
  let password = common.md5(mObj.loginPawd + common.MD5_SUFFXIE)
  const selectUser = `SELECT * FROM user where username='${username}'`
  console.log(selectUser)
  db.query(selectUser, (err, data) => {
    if (err) {
      res.send({ 'msg': '服务器出错', 'status': 0 }).end()
    } else {
      if (data.length === 0) {
        res.send({ 'msg': 'The user does not exist', 'status': -1 }).end()
      } else {
        let dataw = data[0]
        // login sucess
        console.log(dataw.password)
        console.log(password)
        if (dataw.password === password) {
          // save the session
          // req.session.userinfo = dataw
          console.log(req.session)
          dataw.msg = 'Login success'
          dataw.status = 1
          dataw.data = 'admin'
          var token = jwt.sign(user, 'app.get(superSecret)', {
            'expiresInMinutes': 1440 // 设置过期时间
          })
          dataw.token = 'i am token'
          // user.token = jwt.sign(user, process.env.JWT_SECRET)
          console.log(dataw)
          res.json(dataw)
        } else {
          res.json({ 'msg': '密码todo不正确', 'status': -2 })
        }
      }
    }
  })
})
module.exports = users
