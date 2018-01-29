var express = require('express')
var users = express.Router()
const common = require('../libs/common')
// var dbpool = require('../libs/db.pool')
var db = require('../libs/db')
/* GET users listing. */
users.get('/', function (req, res, next) {
  var user = req.session.user
  console.log('router.o' + user)
  next()
})
users.get('/login', function (req, res, next) {
  var user = req.session.user
  console.log('router.o' + user)
  next()
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
    console.log(mObj)
  }
  console.log(mObj.loginPawd)
  let username = mObj.loginName
  let password = common.md5(mObj.loginPawd + common.MD5_SUFFXIE)
  const selectUser = `SELECT * FROM user where username='${username}'`
  console.log(selectUser)
  db.query(selectUser, (err, data) => {
    if (err) {
      console.log('todo' + err)
      res.send({ 'msg': '服务器出错', 'status': 0 }).end()
    } else {
      if (data.length === 0) {
        res.send({ 'msg': 'The user does not exist', 'status': -1 }).end()
      } else {
        let dataw = data[0]
        // login sucess
        if (dataw.password === password) {
          // save the session
          // req.session['userid'] = dataw.userid
          dataw.msg = '登录成功'
          dataw.status = 1
          res.send(dataw).end()
        } else {
          res.send({ 'msg': '密码todo不正确', 'status': -2 }).end()
        }
      }
    }
  })
})
module.exports = users
