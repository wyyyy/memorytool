var express = require('express')
var users = express.Router()
const mysql = require('mysql')
const common = require('../libs/common')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'vhr'
})
/* GET users listing. */
users.get('/', function (req, res, next) {
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
  console.log(db)
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
        if (dataw.login_password === password) {
          // save the session
          req.session['user_id'] = dataw.user_id
          dataw.msg = '登录成功'
          dataw.status = 1
          res.send(dataw).end()
        } else {
          res.send({ 'msg': '密码不正确', 'status': -2 }).end()
        }
      }
    }
  })
})
module.exports = users
